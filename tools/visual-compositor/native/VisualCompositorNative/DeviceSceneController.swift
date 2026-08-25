import AVFoundation
import Combine
import RealityKit
import SwiftUI

@MainActor
final class DeviceSceneController: ObservableObject {
    let sceneRoot = Entity()

    @Published var rotation: Float = 0
    @Published var background = Color(red: 0.93, green: 0.95, blue: 0.98)
    @Published var deviceStatus = "Loading"
    @Published var screenStatus = "Waiting"
    @Published var videoStatus = "Waiting"
    @Published var errorMessage: String?
    @Published var isPlaying = false

    private var normalizedDevice: Entity?
    private var player: AVPlayer?

    var hasVideo: Bool { player != nil }

    func loadDefaultScene() async {
        guard normalizedDevice == nil else { return }

        do {
            let deviceURL = try Self.defaultDeviceURL()
            let loaded = try await Entity(contentsOf: deviceURL)
            let normalized = NormalizedDeviceLoader.normalize(loaded)
            sceneRoot.addChild(normalized)
            normalizedDevice = normalized
            deviceStatus = "Ready"

            if let videoURL = Self.defaultVideoURL() {
                try attachVideo(videoURL, to: normalized)
            } else {
                videoStatus = "Not found"
            }

            applyPresentationTransform()
        } catch {
            deviceStatus = "Failed"
            errorMessage = error.localizedDescription
        }
    }

    func applyPresentationTransform() {
        normalizedDevice?.orientation = simd_quatf(angle: rotation, axis: [0, 1, 0])
    }

    func togglePlayback() {
        guard let player else { return }
        if isPlaying {
            player.pause()
        } else {
            player.play()
        }
        isPlaying.toggle()
    }

    private func attachVideo(_ url: URL, to root: Entity) throws {
        guard let screen = root.firstModelEntity(namedLike: "screen") else {
            screenStatus = "Not found"
            throw DeviceSceneError.screenMeshMissing
        }

        let player = AVPlayer(url: url)
        player.actionAtItemEnd = .none
        let material = VideoMaterial(avPlayer: player)

        // The source Sketchfab glass material imports as opaque in RealityKit and
        // covers the display. Keep lens glass, but remove the front cover until the
        // normalized USDZ derivative repairs that material.
        root.modelEntities(namedLike: "glass")
            .filter { !$0.name.localizedCaseInsensitiveContains("lensinglass") }
            .forEach { $0.isEnabled = false }

        guard var model = screen.components[ModelComponent.self] else {
            throw DeviceSceneError.screenHasNoModel
        }
        model.materials = Array(repeating: material, count: max(1, model.materials.count))
        screen.components.set(model)
        screen.orientation *= simd_quatf(angle: .pi, axis: [0, 1, 0])

        self.player = player
        screenStatus = "Mapped · \(screen.name)"
        videoStatus = "Ready"
    }

    private static func defaultDeviceURL() throws -> URL {
        let environment = ProcessInfo.processInfo.environment
        let path = environment["VISUAL_COMPOSITOR_DEVICE"]
            ?? NSString(string: "~/Downloads/iPhone_17_Pro_Max.usdz").expandingTildeInPath
        let url = URL(fileURLWithPath: path)
        guard FileManager.default.fileExists(atPath: url.path) else {
            throw DeviceSceneError.deviceMissing(url.path)
        }
        return url
    }

    private static func defaultVideoURL() -> URL? {
        let environment = ProcessInfo.processInfo.environment
        let candidates = [
            environment["VISUAL_COMPOSITOR_VIDEO"],
            "tools/visual-compositor/generated/rem-chat-light.mp4",
            "../generated/rem-chat-light.mp4"
        ].compactMap { $0 }

        return candidates
            .map { URL(fileURLWithPath: $0, relativeTo: URL(fileURLWithPath: FileManager.default.currentDirectoryPath)).standardizedFileURL }
            .first { FileManager.default.fileExists(atPath: $0.path) }
    }
}

@MainActor
enum NormalizedDeviceLoader {
    static func normalize(_ source: Entity) -> Entity {
        let wrapper = Entity()
        wrapper.name = "normalized-device"
        wrapper.addChild(source)

        let bounds = source.visualBounds(relativeTo: source)
        let longestSide = max(bounds.extents.x, bounds.extents.y, bounds.extents.z)
        guard longestSide > 0 else { return wrapper }

        let uniformScale: Float = 1.72 / longestSide
        source.scale = .init(repeating: uniformScale)
        source.position = -bounds.center * uniformScale
        source.orientation = simd_quatf(angle: .pi / 2, axis: [0, 1, 0])
        return wrapper
    }
}

private extension Entity {
    func firstModelEntity(namedLike needle: String) -> Entity? {
        if name.localizedCaseInsensitiveContains(needle), components[ModelComponent.self] != nil {
            return self
        }
        for child in children {
            if let match = child.firstModelEntity(namedLike: needle) { return match }
        }
        return nil
    }

    func modelEntities(namedLike needle: String) -> [Entity] {
        var matches: [Entity] = []
        if name.localizedCaseInsensitiveContains(needle), components[ModelComponent.self] != nil {
            matches.append(self)
        }
        for child in children {
            matches.append(contentsOf: child.modelEntities(namedLike: needle))
        }
        return matches
    }
}

enum DeviceSceneError: LocalizedError {
    case deviceMissing(String)
    case screenMeshMissing
    case screenHasNoModel

    var errorDescription: String? {
        switch self {
        case .deviceMissing(let path):
            "USDZ not found at \(path). Set VISUAL_COMPOSITOR_DEVICE to override it."
        case .screenMeshMissing:
            "No model entity containing 'screen' was found in the USDZ hierarchy."
        case .screenHasNoModel:
            "The screen entity does not expose a replaceable RealityKit model component."
        }
    }
}
