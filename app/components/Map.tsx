/** @format */

// /** @format */
// "use client";
// import L from "leaflet";
// // import { MapContainer, Marker, TileLayer } from "react-leaflet";
// import {MapContainer, TileLayer} from "react-leaflet";

// import "leaflet/dist/leaflet.css";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import {Suspense, useEffect} from "react";

// //@ts-ignore
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
// 	iconUrl: markerIcon.src,
// 	iconRetinaUrl: markerIcon2x.src,
// 	shadowUrl: markerShadow.src,
// });
// interface IProps {
// 	center?: number[];
// }
// const Map: React.FC<IProps> = ({center}) => {
// 	useEffect(() => {
// 		return () => {
// 			const m = L.DomUtil.get("map") as
// 				| (HTMLElement & {_leaflet_id: number | null})
// 				| null;
// 			if (m) {
// 				m._leaflet_id = null;
// 			}
// 		};
// 	}, []);
// 	return (
// 		<>
// 			<MapContainer
// 				center={(center as L.LatLngExpression) || [51, -0.09]}
// 				zoom={center ? 4 : 2}
// 				scrollWheelZoom={false}
// 				className='h-[30vh] rounded-lg'>
// 				<Suspense>
// 					<TileLayer
// 						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// 					/>
// 				</Suspense>
// 			</MapContainer>
// 		</>
// 	);
// };

// export default Map;

"use client";
import React, {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

interface IProps {
	center?: number[];
	locationRegion?: string;
	locationLabel?: string;
}
const Map: React.FC<IProps> = ({center, locationRegion, locationLabel}) => {
	useEffect(() => {
		const container = L.DomUtil.get("map");

		if (container != null) {
			container._leaflet_id = null;
		}
		const map = L.map("map").setView(
			(center as L.LatLngExpression) || [51, -0.09],
			4,
		);
		L.tileLayer(
			"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
			{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

				id: "mapbox/streets-v11",
				maxZoom: 6,
				minZoom: 6,
				detectRetina: true,
				zoomOffset: 0,
				accessToken:
					"pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
			},
		).addTo(map);
		L.Marker.prototype.options.icon = DefaultIcon;
		if (center) {
			const marker = L.marker(center as L.LatLngExpression).addTo(map);
			marker
				.bindPopup(`<b>${locationLabel}</b><br><b>${locationRegion}</b>`)
				.openPopup();
		}
	}, [center, locationRegion, locationLabel]);
	return (
		<div
			id='map'
			className='h-[50vh] rounded-lg'></div>
	);
};

export default Map;
