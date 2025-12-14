interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label?: string
}

export default function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-teal-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
    </div>
  )
}

