import React from 'react'

const StatsCard = ({label, value, hint}) => {
    return (
        <div className="rounded-lg border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <h3 className="mt-2 text-3xl font-semibold text-slate-900">{value}</h3>
            {hint ? <p className="mt-2 text-sm text-slate-600">{hint}</p> : null}
        </div>
    )
}
export default StatsCard
