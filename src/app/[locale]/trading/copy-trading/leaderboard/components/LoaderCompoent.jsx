const LoaderComponent = () => {
    return (
        <div className="container">
            <div className="animate-pulse space-y-6">
                {/* Header skeleton */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-xl bg-slate-200" />
                            <div className="space-y-2">
                                <div className="h-4 w-44 rounded bg-slate-200" />
                                <div className="h-3 w-64 rounded bg-slate-100" />
                            </div>
                        </div>
                        <div className="h-10 w-full rounded-lg bg-slate-200 md:w-40" />
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-14 rounded-xl bg-slate-100" />
                        ))}
                    </div>
                </div>

                {/* Performance skeleton */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="h-4 w-32 rounded bg-slate-200" />
                        <div className="mt-5 space-y-3">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className="h-4 w-full rounded bg-slate-100" />
                            ))}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="h-10 w-32 rounded bg-slate-100" />
                        <div className="mt-4 h-[280px] w-full rounded-xl bg-slate-100" />
                    </div>
                </div>

                {/* Lower content skeleton */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="h-4 w-40 rounded bg-slate-200" />
                    <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-16 rounded-xl bg-slate-100" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoaderComponent