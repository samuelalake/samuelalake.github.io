import SwiftUI

struct ContentView: View {
    @StateObject private var scene = DeviceSceneController()

    var body: some View {
        HSplitView {
            controls
                .frame(minWidth: 270, idealWidth: 300, maxWidth: 340)

            DeviceRealityView(scene: scene)
                .background(scene.background)
                .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
                .padding(18)
        }
        .task {
            await scene.loadDefaultScene()
        }
    }

    private var controls: some View {
        VStack(alignment: .leading, spacing: 24) {
            VStack(alignment: .leading, spacing: 7) {
                Text("Native device renderer")
                    .font(.title2.weight(.semibold))
                Text("RealityKit depth and screen playback, driven by a normalized device adapter.")
                    .foregroundStyle(.secondary)
            }

            VStack(alignment: .leading, spacing: 10) {
                Text("Pose")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)

                HStack(spacing: 7) {
                    poseButton("Front", angle: 0)
                    poseButton("Three-quarter", angle: -0.48)
                    poseButton("Profile", angle: -1.32)
                }
            }

            VStack(alignment: .leading, spacing: 10) {
                Text("Screen")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)

                Button(scene.isPlaying ? "Pause recording" : "Play recording") {
                    scene.togglePlayback()
                }
                .buttonStyle(.borderedProminent)
                .disabled(!scene.hasVideo)
            }

            Divider()

            LabeledContent("Device", value: scene.deviceStatus)
            LabeledContent("Screen mesh", value: scene.screenStatus)
            LabeledContent("Video", value: scene.videoStatus)

            if let error = scene.errorMessage {
                Text(error)
                    .font(.callout)
                    .foregroundStyle(.red)
                    .textSelection(.enabled)
            }

            Spacer()

            Text("Model: MajdyModels · CC BY 4.0")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(24)
    }

    private func poseButton(_ title: String, angle: Float) -> some View {
        Button(title) {
            withAnimation(.spring(duration: 0.34, bounce: 0.08)) {
                scene.rotation = angle
            }
        }
        .buttonStyle(.bordered)
    }
}
