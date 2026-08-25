import SwiftUI

@main
struct VisualCompositorNativeApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .frame(minWidth: 920, minHeight: 680)
        }
        .windowStyle(.hiddenTitleBar)
    }
}
