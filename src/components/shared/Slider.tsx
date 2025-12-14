interface SliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  label?: string
  showValue?: boolean
  valueLabel?: string
}

export default function Slider({
  value,
  onChange,
  min,
  max,
  step,
  label,
  showValue = true,
  valueLabel
}: SliderProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {showValue && (
            <span className="text-sm font-semibold text-teal-600">
              {value} {valueLabel}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}{valueLabel}</span>
        <span>{max}{valueLabel}</span>
      </div>
    </div>
  )
}

