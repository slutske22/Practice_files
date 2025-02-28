//
//  Landmark.swift
//  Landmarks
//
//  Created by Seth Lutske on 2/27/25.
//

import Foundation
import SwiftUI
import CoreLocation

struct Landmark: Hashable, Codable, Identifiable {
    /// The ID of the Landmark
    var id: Int
    /// The name
    var name: String
    var park: String
    var state: String
    var description: String
    
    private var imageName: String
    
    /// Image representing the landmark
    var image: Image {
        Image(imageName)
    }
    
    private var coordinates: Coordinates
    var locationCoordinates: CLLocationCoordinate2D {
        CLLocationCoordinate2D(
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        )
    }
    
    struct Coordinates: Hashable, Codable {
        var latitude: Double
        var longitude: Double
    }
}
