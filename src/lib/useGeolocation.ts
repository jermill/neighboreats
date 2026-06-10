'use client'

import { useEffect, useState } from 'react'

/**
 * Geolocation hook
 *
 * Requests the browser's location once and falls back to
 * DEFAULT_COORDS (Wilmington, DE) when denied or unavailable.
 */

export const DEFAULT_COORDS = {
  latitude: 39.7459,
  longitude: -75.5466
}

export type GeolocationStatus = 'loading' | 'granted' | 'denied' | 'unavailable'

export interface GeolocationState {
  coords: { latitude: number; longitude: number }
  status: GeolocationStatus
}

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    coords: DEFAULT_COORDS,
    status: 'loading'
  })

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState({ coords: DEFAULT_COORDS, status: 'unavailable' })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          status: 'granted'
        })
      },
      (error) => {
        setState({
          coords: DEFAULT_COORDS,
          status: error.code === error.PERMISSION_DENIED ? 'denied' : 'unavailable'
        })
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    )
  }, [])

  return state
}

// Haversine formula to calculate distance between two coordinates (in miles)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
