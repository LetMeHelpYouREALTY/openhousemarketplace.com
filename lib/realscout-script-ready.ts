/** Tracks RealScout UMD script load (layout Script onLoad). */

let scriptReady = false
const listeners = new Set<() => void>()

export function markRealScoutScriptReady(): void {
  if (scriptReady) return
  scriptReady = true
  listeners.forEach((listener) => listener())
}

export function isRealScoutScriptReady(): boolean {
  return scriptReady
}

export function subscribeRealScoutScriptReady(listener: () => void): () => void {
  if (scriptReady) {
    listener()
    return () => {}
  }
  listeners.add(listener)
  return () => listeners.delete(listener)
}
