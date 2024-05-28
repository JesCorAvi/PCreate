
export default function ProgressBar({ puntuacionTotal }){
    const maxScore = 2500;
    const percentage = (puntuacionTotal / maxScore) * 100;

    let progressBarClass = '';
    if (percentage <= 20) {
        progressBarClass = 'bg-red-500';
    } else if (percentage <= 40) {
        progressBarClass = 'bg-yellow-500';
    } else if (percentage <= 70) {
        progressBarClass = 'bg-amber-400';
    } else {
        progressBarClass = 'bg-green-500';
    }

    return (
        <div className="w-full bg-gray-200 rounded-full h-4">
            <div className={`${progressBarClass} h-full rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};
