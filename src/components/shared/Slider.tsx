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
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-4">
      {/* Label and Value */}
      <div className="flex justify-between items-center">
        {label && (
          <label className="text-base font-semibold text-gray-900">{label}</label>
        )}
        {showValue && (
          <div className="bg-teal-100 px-4 py-1.5 rounded-full">
            <span className="text-base font-bold text-teal-700">
              {value} {valueLabel}
            </span>
          </div>
        )}
      </div>

      {/* Custom Slider */}
      <div className="relative">
        {/* Track Background */}
        <div className="h-2 bg-gray-200 rounded-full">
          {/* Progress Fill */}
          <div 
            className="h-full bg-gradient-to-r from-teal-500 to-brand-teal rounded-full transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Slider Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
          style={{ zIndex: 10 }}
        />
        
        {/* Thumb */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-brand-teal rounded-full shadow-lg pointer-events-none transition-all duration-200"
          style={{ 
            left: `calc(${percentage}% - 12px)`,
            zIndex: 5
          }}
        />
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-sm font-medium text-gray-600">
        <span>{min} {valueLabel}</span>
        <span>{max} {valueLabel}</span>
      </div>
    </div>
  )
}


