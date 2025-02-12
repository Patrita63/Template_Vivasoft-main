import React from "react";
import styles from "./CalendarTable.module.css"; // Ensure you have styles defined

const CalendarTable = ({ data, onCellClick }) => {
    debugger;
    console.log('CalendarTable: ', data);
  const days = data;

  // Sort days by date
  days.sort((a, b) => new Date(a.Day_Date) - new Date(b.Day_Date));

  // Group days into weeks
  const weeks = [];
  let currentWeek = [];

  days.forEach((day, index) => {
    if (day.Day_WeekdayNumber === 1 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);

    if (index === days.length - 1) {
      weeks.push(currentWeek);
    }
  });

  // Get today's date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="overflow-x-auto p-4">
      <table className="border-collapse border border-gray-300 w-full text-center">
       {/* ✅ CUSTOM HEADER WITH SUNDAY & SATURDAY IN RED */}
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}># Week</th>
            <th className={styles.thRed}>Sunday</th>
            <th className={styles.th}>Monday</th>
            <th className={styles.th}>Tuesday</th>
            <th className={styles.th}>Wednesday</th>
            <th className={styles.th}>Thursday</th>
            <th className={styles.th}>Friday</th>
            <th className={styles.thRed}>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => {
            const weekDays = Array(7).fill(null);

            // Fill correct weekday slots
            week.forEach((day) => {
              weekDays[day.Day_WeekdayNumber - 1] = day;
            });

            return (
              <tr key={weekIndex} className={styles.tr}>
                <td className={`${styles.th} font-bold`}>{week[0].Day_WeekNumber}</td>
                {weekDays.map((day, dayIndex) => {
                  const isToday = day && day.Day_Date.split("T")[0] === today;
                  const cellClass =
                    dayIndex === 0 || dayIndex === 6 // Sunday & Saturday
                      ? `${styles.tdRed} ${isToday ? styles.today : ""}`
                      : `${styles.td} ${isToday ? styles.today : ""}`;

                  return (
                    <td
                      key={dayIndex}
                      className={cellClass}
                      onClick={() => day && onCellClick(day)}
                      style={{ cursor: "pointer" }}
                    >
                      {day ? (
                        <div>
                          <strong>{day.Day_DayNumber}</strong>
                          {day.IdAgendaCorsi !== null && <span className="text-green-500 ml-2">🟢</span>}
                          {day.ClienteFinale && (
                            <div className="text-sm text-gray-600">
                              {day.NomeCorso} - {day.StatoAgenda} - {day.LearningCenter} - {day.TipoErogazione} 
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-400">-</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarTable;
