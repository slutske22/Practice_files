//
//  ContentView.swift
//  Landmarks
//
//  Created by Seth Lutske on 2/25/25.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        LandmarkList()
    }
}

#Preview {
    ContentView()
        .environment(ModelData())
}
