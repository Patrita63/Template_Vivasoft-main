import React from "react";
import styles from "./CalendarTable.module.css"; // Import CSS Module

const CalendarTable = ({ data, onCellClick }) => {
  console.log("CalendarTable: ", data);
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
    <div className={styles.tableContainer}>
      <table className={styles.calendarTable}>
        {/* ✅ CUSTOM HEADER WITH SUNDAY & SATURDAY IN RED */}
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}># Week</th>
            <th className={styles.tableHeaderRed}>Sunday</th>
            <th className={styles.tableHeader}>Monday</th>
            <th className={styles.tableHeader}>Tuesday</th>
            <th className={styles.tableHeader}>Wednesday</th>
            <th className={styles.tableHeader}>Thursday</th>
            <th className={styles.tableHeader}>Friday</th>
            <th className={styles.tableHeaderRed}>Saturday</th>
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
              <tr key={weekIndex} className={styles.tableRow}>
                <td className={`${styles.tableCell} font-bold`}>{week[0].Day_WeekNumber}</td>
                {weekDays.map((day, dayIndex) => {
                  const isToday = day && day.Day_Date.split("T")[0] === today;
                  const cellClass =
                    dayIndex === 0 || dayIndex === 6 // Sunday & Saturday
                      ? `${styles.tableCellRed} ${isToday ? styles.today : ""}`
                      : `${styles.tableCell} ${isToday ? styles.today : ""}`;

                  return (
                    <td
                      key={dayIndex}
                      className={cellClass}
                      onClick={() => day && onCellClick(day)}
                      style={{ cursor: "pointer" }}
                      data-label={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex]} // For mobile
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
