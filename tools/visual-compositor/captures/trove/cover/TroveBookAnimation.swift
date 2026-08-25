import SwiftUI
#if canImport(AppKit)
import AppKit
#endif

/// A self-contained, asset-free book-opening animation for Trove.
/// Designed for iOS 17+ and automatically respects Reduce Motion.
struct TroveBookAnimation: View {
    var loops = true
    /// Optional deterministic timeline position for previews, QA, and exports.
    /// Leave nil for normal real-time playback.
    var previewProgress: Double? = nil

    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var startedAt = Date.now

    private let duration = 5.4

    var body: some View {
        TimelineView(.animation(minimumInterval: 1.0 / 60.0, paused: reduceMotion)) { timeline in
            let elapsed = timeline.date.timeIntervalSince(startedAt)
            let raw = loops ? elapsed.truncatingRemainder(dividingBy: duration) : min(elapsed, duration)
            let liveProgress = max(0, raw / duration)
            let t = reduceMotion ? 1.0 : min(max(previewProgress ?? liveProgress, 0), 1)

            GeometryReader { proxy in
                let size = min(proxy.size.width, proxy.size.height * 1.18)
                let page = CGSize(width: size * 0.43, height: size * 0.57)
                let paperPage = CGSize(width: page.width - 12, height: page.height - 18)
                let openness = flip(t, openStart: 0.10, openEnd: 0.20, closeStart: 0.87, closeEnd: 0.95)

                ZStack {
                    Ellipse()
                        .fill(Color.troveInk.opacity(0.14))
                        .frame(width: size * mix(0.30, 0.72, openness), height: size * 0.09)
                        .blur(radius: 12)
                        .offset(y: page.height * 0.58)

                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.troveCoverDark)
                            .frame(width: page.width, height: page.height)
                            .offset(x: page.width * 0.03, y: 5)

                        RoundedRectangle(cornerRadius: 11)
                            .fill(Color.trovePaper)
                            .frame(width: paperPage.width, height: paperPage.height)

                        BookPage(kind: .dinner, size: paperPage)

                        FlippingLeaf(size: paperPage, progress: flip(t, openStart: 0.48, openEnd: 0.56, closeStart: 0.87, closeEnd: 0.95), stackOrder: 4) {
                            BookPage(kind: .recipe, size: paperPage)
                        } back: {
                            BookPage(kind: .seasonal, size: paperPage, hingeEdge: .trailing)
                        }

                        FlippingLeaf(size: paperPage, progress: flip(t, openStart: 0.39, openEnd: 0.47, closeStart: 0.87, closeEnd: 0.95), stackOrder: 3) {
                            BookPage(kind: .mealPlan, size: paperPage)
                        } back: {
                            BookPage(kind: .cookTogether, size: paperPage, hingeEdge: .trailing)
                        }

                        FlippingLeaf(size: paperPage, progress: flip(t, openStart: 0.30, openEnd: 0.38, closeStart: 0.87, closeEnd: 0.95), stackOrder: 2) {
                            BookPage(kind: .groceries, size: paperPage)
                        } back: {
                            BookPage(kind: .pantry, size: paperPage, hingeEdge: .trailing)
                        }

                        FlippingLeaf(size: paperPage, progress: flip(t, openStart: 0.21, openEnd: 0.29, closeStart: 0.87, closeEnd: 0.95), stackOrder: 1) {
                            BookPage(kind: .saved, size: paperPage)
                        } back: {
                            BookPage(kind: .quickBites, size: paperPage, hingeEdge: .trailing)
                        }

                        FlippingLeaf(size: page, progress: openness, isCover: true, stackOrder: 0) {
                            TroveCover(size: page)
                        } back: {
                            Color.troveCover
                        }
                    }
                    .frame(width: page.width * 2, height: page.height, alignment: .trailing)
                    .offset(x: page.width * mix(-0.50, 0, openness))
                    .rotation3DEffect(.degrees(14), axis: (x: 1, y: 0, z: 0), perspective: 0.5)
                    .rotation3DEffect(.degrees(-7), axis: (x: 0, y: 1, z: 0), perspective: 0.5)
                    .rotationEffect(.degrees(mix(-7, -4, openness)))
                    .scaleEffect(mix(0.92, 0.88, openness))
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .accessibilityLabel("Trove book opening to reveal shared recipes, groceries, and meal plans")
        .onTapGesture { startedAt = .now }
    }

    private func ease(_ value: Double, _ start: Double, _ end: Double) -> Double {
        let x = min(max((value - start) / (end - start), 0), 1)
        return 1 - pow(1 - x, 3)
    }

    private func flip(_ value: Double, openStart: Double, openEnd: Double, closeStart: Double, closeEnd: Double) -> Double {
        if value < openStart { return 0 }
        if value < openEnd { return ease(value, openStart, openEnd) }
        if value < closeStart { return 1 }
        if value < closeEnd { return 1 - ease(value, closeStart, closeEnd) }
        return 0
    }

    private func mix(_ a: Double, _ b: Double, _ t: Double) -> Double { a + (b - a) * t }
}

private struct FlippingLeaf<Front: View, Back: View>: View {
    let size: CGSize
    let progress: Double
    var isCover = false
    var stackOrder = 0
    @ViewBuilder let front: Front
    @ViewBuilder let back: Back

    var body: some View {
        ZStack {
            front.opacity(progress < 0.5 ? 1 : 0)
            back
                .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
                .opacity(progress >= 0.5 ? 1 : 0)
        }
            .frame(width: size.width, height: size.height)
            .background(isCover ? Color.troveCover : Color.trovePaper)
            .clipShape(RoundedRectangle(cornerRadius: isCover ? 12 : 9))
            .shadow(color: Color.troveInk.opacity(0.13 * (1 - abs(progress - 0.5) * 2)), radius: 10, x: 5, y: 5)
            .rotation3DEffect(
                .degrees(-178 * progress),
                axis: (x: 0, y: 1, z: 0),
                anchor: .leading,
                perspective: 0.62
            )
            // Turned leaves accumulate on the left in page order. Unturned
            // leaves retain the inverse order on the right beneath the cover.
            .zIndex(
                isCover
                    ? (progress < 0.5 ? 20 : -20)
                    : (progress < 0.5 ? 10 - Double(stackOrder) : -10 + Double(stackOrder))
            )
    }
}

private enum PageKind: Equatable {
    case saved, quickBites, groceries, pantry, mealPlan, cookTogether, recipe, seasonal, dinner

    var title: String {
        switch self {
        case .saved: "COLLECTIONS"
        case .quickBites: "QUICK BITES"
        case .groceries: "GROCERIES"
        case .pantry: "YOUR PANTRY"
        case .mealPlan: "MEAL PLAN"
        case .cookTogether: "COOK TOGETHER"
        case .recipe: "RECIPE"
        case .seasonal: "SEASONAL PICKS"
        case .dinner: "DINNER INSPIRATION"
        }
    }

    var symbol: String {
        switch self {
        case .saved: "heart.text.square.fill"
        case .quickBites: "takeoutbag.and.cup.and.straw.fill"
        case .groceries: "cart.fill"
        case .pantry: "cabinet.fill"
        case .mealPlan: "calendar"
        case .cookTogether: "frying.pan.fill"
        case .recipe: "birthday.cake.fill"
        case .seasonal: "carrot.fill"
        case .dinner: "fork.knife.circle.fill"
        }
    }

    var illustrationAsset: String {
        switch self {
        case .saved: "Mixed Fruits"
        case .quickBites: "Yogurt"
        case .groceries: "Vegetable Medley"
        case .pantry: "Corn Flakes"
        case .mealPlan: "Salad"
        case .cookTogether: "Fried Eggs"
        case .recipe: "Avocado"
        case .seasonal: "Berries"
        case .dinner: "Fish Plate"
        }
    }
}

private struct BookPage: View {
    let kind: PageKind
    let size: CGSize
    var hingeEdge: HorizontalEdge = .leading

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 9)
                .fill(Color.trovePaper)
                .overlay(alignment: hingeEdge == .leading ? .leading : .trailing) {
                    LinearGradient(
                        colors: [Color.troveInk.opacity(0.15), Color.troveInk.opacity(0.045), .clear],
                        startPoint: hingeEdge == .leading ? .leading : .trailing,
                        endPoint: hingeEdge == .leading ? .trailing : .leading
                    )
                    .frame(width: size.width * 0.10)
                    .clipShape(RoundedRectangle(cornerRadius: 9))
                }
                .overlay {
                    RoundedRectangle(cornerRadius: 9)
                        .stroke(Color.troveCoverDark.opacity(0.10), lineWidth: 1)
                }

            VStack(alignment: .leading, spacing: 7) {
                    Text(kind.title)
                        .font(.system(size: size.width * 0.042, weight: .heavy, design: .rounded))
                        .tracking(1.1)
                        .foregroundStyle(kind == .dinner ? Color.troveCover : Color.troveCoverDark)
                    Capsule().fill(Color.trovePeach.opacity(0.55)).frame(height: 6)
                    Capsule().fill(Color.trovePeach.opacity(0.4)).frame(width: size.width * 0.52, height: 6)
                    Spacer()
                    RoundedRectangle(cornerRadius: 9)
                        .fill([PageKind.groceries, .pantry, .dinner].contains(kind) ? Color.troveBlue.opacity(0.30) : Color.trovePeach.opacity(0.34))
                        .frame(height: size.height * 0.40)
                        .overlay {
                            TrovePageIllustration(kind: kind, width: size.width)
                        }
                        .rotationEffect(.degrees(kind == .mealPlan ? -2 : 3))
                }
                .padding(size.width * 0.11)
        }
        .frame(width: size.width, height: size.height)
    }
}

/// A consistent licensed food-illustration family across every spread. The
/// source SVGs stay local and are used only to render the final composition;
/// the SF Symbol remains a graceful fallback when those files are unavailable.
private struct TrovePageIllustration: View {
    let kind: PageKind
    let width: Double

    var body: some View {
        LicensedFoodIllustration(kind: kind)
            .frame(width: width * 0.42, height: width * 0.29)
    }
}

private struct LicensedFoodIllustration: View {
    let kind: PageKind

    var body: some View {
#if canImport(AppKit)
        if let image = NSImage(contentsOf: illustrationURL) {
            Image(nsImage: image)
                .resizable()
                .scaledToFit()
                .accessibilityHidden(true)
        } else {
            fallback
        }
#else
        // When this component is moved into an iOS target, add the same SVGs
        // to the asset catalog using these names to keep them vector-backed.
        Image(kind.illustrationAsset)
            .resizable()
            .scaledToFit()
            .accessibilityHidden(true)
#endif
    }

#if canImport(AppKit)
    private var illustrationURL: URL {
        URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent()
            .appendingPathComponent("assets/licensed", isDirectory: true)
            .appendingPathComponent(kind.illustrationAsset)
            .appendingPathExtension("svg")
    }
#endif

    private var fallback: some View {
        Image(systemName: kind.symbol)
            .symbolRenderingMode(.hierarchical)
            .font(.system(size: 42, weight: .bold, design: .rounded))
            .foregroundStyle(Color.troveBlue)
            .accessibilityHidden(true)
    }
}

private struct TroveCover: View {
    let size: CGSize

    var body: some View {
        ZStack(alignment: .topLeading) {
            Color.troveCover
            LinearGradient(colors: [Color.troveInk.opacity(0.16), .clear], startPoint: .leading, endPoint: UnitPoint(x: 0.16, y: 0.5))

            VStack(alignment: .leading, spacing: 7) {
                Text("MAKE MEALS SOCIAL")
                    .font(.system(size: size.width * 0.045, weight: .bold, design: .rounded))
                    .tracking(2).opacity(0.72)
                Text("Trove")
                    .font(.system(size: size.width * 0.22, weight: .bold, design: .default))
                    .tracking(-3)
                Capsule().fill(Color.troveSun).frame(width: size.width * 0.36, height: 6).padding(.top, 7)
                Capsule().fill(Color.troveSun.opacity(0.55)).frame(width: size.width * 0.23, height: 6)
                Spacer()
                HStack(spacing: 7) {
                    HStack(spacing: -9) {
                        CartoonFace(skin: Color(red: 0.44, green: 0.24, blue: 0.16), hair: Color(red: 0.15, green: 0.10, blue: 0.08))
                        CartoonFace(skin: Color(red: 0.85, green: 0.57, blue: 0.40), hair: Color(red: 0.25, green: 0.15, blue: 0.11))
                        CartoonFace(skin: Color(red: 0.62, green: 0.36, blue: 0.24), hair: Color(red: 0.10, green: 0.16, blue: 0.19))
                    }
                    Text("saved by you and friends")
                        .font(.system(size: size.width * 0.038, weight: .bold, design: .rounded))
                        .opacity(0.78)
                }
            }
            .foregroundStyle(Color(red: 1, green: 0.97, blue: 0.91))
            .padding(size.width * 0.11)
        }
        .frame(width: size.width, height: size.height)
    }
}

private struct CartoonFace: View {
    let skin: Color
    let hair: Color

    var body: some View {
        Circle().fill(skin)
            .overlay(alignment: .top) { Capsule().fill(hair).frame(height: 13).padding(2) }
            .overlay { Text("••").font(.system(size: 8, weight: .black)).foregroundStyle(Color.troveInk) }
            .overlay { Circle().stroke(Color.troveCover, lineWidth: 3) }
            .frame(width: 34, height: 34)
    }
}

private extension Color {
    static let troveCover = Color(red: 0.918, green: 0.416, blue: 0.180)
    static let troveCoverDark = Color(red: 0.788, green: 0.310, blue: 0.122)
    static let trovePaper = Color.white
    static let troveInk = Color(red: 0.443, green: 0.208, blue: 0.137)
    static let troveBlue = Color(red: 0.427, green: 0.718, blue: 0.773)
    static let trovePeach = Color(red: 0.957, green: 0.635, blue: 0.380)
    static let troveSun = Color(red: 0.961, green: 0.765, blue: 0.357)
}

#if DEBUG
    #Preview {
        TroveBookAnimation()
            .frame(width: 390, height: 360)
            .background(Color(red: 1, green: 0.976, blue: 0.937))
    }
#endif
