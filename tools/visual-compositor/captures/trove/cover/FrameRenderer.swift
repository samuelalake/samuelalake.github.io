import AppKit
import SwiftUI

/// Renders deterministic checkpoints for the Trove cover timeline.
/// Usage: TroveFrameRenderer <output-directory> [progress ...]
@main
struct FrameRenderer {
    static func main() throws {
        let arguments = Array(CommandLine.arguments.dropFirst())
        guard let outputPath = arguments.first else {
            throw RenderError.missingOutputDirectory
        }

        let timelineArguments = Array(arguments.dropFirst())
        let requested = timelineArguments.compactMap(Double.init)
        let checkpoints: [Double]
        if timelineArguments.contains("--full") {
            checkpoints = (0...162).map { Double($0) / 162 }
        } else if requested.isEmpty {
            checkpoints = stride(from: 0.76, through: 0.98, by: 0.01).map { $0 }
        } else {
            checkpoints = requested
        }

        let outputURL = URL(fileURLWithPath: outputPath, isDirectory: true)
        try FileManager.default.createDirectory(
            at: outputURL,
            withIntermediateDirectories: true
        )

        for (index, progress) in checkpoints.enumerated() {
            let view = TroveBookAnimation(
                loops: false,
                previewProgress: progress
            )
            .frame(width: 760, height: 594)
            .background(Color(red: 1, green: 0.976, blue: 0.937))

            let renderer = ImageRenderer(content: view)
            renderer.scale = 2

            guard
                let image = renderer.nsImage,
                let tiff = image.tiffRepresentation,
                let bitmap = NSBitmapImageRep(data: tiff),
                let png = bitmap.representation(using: .png, properties: [:])
            else {
                throw RenderError.failedFrame(progress)
            }

            let filename = String(
                format: "frame-%04d-p%03d.png",
                index,
                Int((progress * 1000).rounded())
            )
            try png.write(to: outputURL.appendingPathComponent(filename))
        }
    }
}

private enum RenderError: LocalizedError {
    case missingOutputDirectory
    case failedFrame(Double)

    var errorDescription: String? {
        switch self {
        case .missingOutputDirectory:
            "Pass an output directory as the first argument."
        case let .failedFrame(progress):
            "Could not render timeline frame at progress \(progress)."
        }
    }
}
