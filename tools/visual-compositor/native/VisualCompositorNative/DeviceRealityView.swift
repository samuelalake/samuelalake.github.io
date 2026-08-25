import RealityKit
import SwiftUI

struct DeviceRealityView: View {
    @ObservedObject var scene: DeviceSceneController
    @State private var dragStart: Float?

    var body: some View {
        RealityView { content in
            content.add(scene.sceneRoot)
        } update: { _ in
            scene.applyPresentationTransform()
        }
        .contentShape(Rectangle())
        .gesture(
            DragGesture(minimumDistance: 2)
                .onChanged { value in
                    if dragStart == nil { dragStart = scene.rotation }
                    let start = dragStart ?? scene.rotation
                    scene.rotation = start + Float(value.translation.width / 280)
                }
                .onEnded { _ in
                    dragStart = nil
                }
        )
        .overlay(alignment: .bottom) {
            Text("Drag to rotate")
                .font(.caption.weight(.medium))
                .foregroundStyle(.secondary)
                .padding(.horizontal, 11)
                .padding(.vertical, 7)
                .background(.regularMaterial, in: Capsule())
                .padding(18)
        }
    }
}
