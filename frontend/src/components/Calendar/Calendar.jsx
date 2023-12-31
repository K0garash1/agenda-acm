import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek } from 'date-fns';
import "./calendar.css"

const Calendar = ({ changeDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const nextMonth = () => {
        changeDate(addMonths(currentDate, 1))
        setCurrentDate(addMonths(currentDate, 1));
    };

    const prevMonth = () => {
        changeDate(subMonths(currentDate, 1))
        setCurrentDate(subMonths(currentDate, 1));
    };

    const goToCurrentMonth = () => {
        changeDate(new Date())
        setCurrentDate(new Date());
    };

    const getDaysInMonth = () => {
        const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }); // 1 for Monday
        const end = endOfMonth(currentDate);

        const days = eachDayOfInterval({ start, end });

        return days;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <button className='btn-secondary' onClick={prevMonth}>Anterior Mes</button>
                <button className='btn-primary' onClick={goToCurrentMonth}>Hoy</button>
                <button className='btn-secondary' onClick={nextMonth}>Siguiente Mes</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        <th>Sábado</th>
                        <th>Domingo</th>
                    </tr>
                </thead>
                <tbody>
                    {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {getDaysInMonth().slice(row * 7, (row + 1) * 7).map((day, index) => (
                                <td key={index} onClick={() => changeDate(day)}>{day ? format(day, 'd') : ''}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar