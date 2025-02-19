import React, { useState } from "react";
import styles from "./CalendarTable.module.css"; // Import CSS Module

const CalendarTable = ({ data, onCellClick }) => {
  console.log("CalendarTable: ", data);

  // Sort days without mutating the original array
  const sortedDays = [...data].sort((a, b) => new Date(a.Day_Date) - new Date(b.Day_Date));

  // Group days into weeks
  const weeks = [];
  let currentWeek = [];

  sortedDays.forEach((day, index) => {
    if (day.Day_WeekdayNumber === 1 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);

    if (index === sortedDays.length - 1) {
      weeks.push(currentWeek);
    }
  });

  // Get today's date
  const today = new Date().toISOString().split("T")[0];

  // Utility function to compare dates
  const isSameDate = (date1, date2) => new Date(date1).toDateString() === new Date(date2).toDateString();

  // Map StatoAgenda to corresponding colors
  const statusColors = {
    "Libera Vivasoft": "bg-blue-500", // 🔵
    "Da Confermare": "bg-yellow-500", // 🟡
    "Confermato": "bg-green-500", // 🟢
    "Annullato": "bg-red-500", // 🔴
    "Terminato con successo": "bg-green-700", // 🟢 (dark green)
    "Abortito": "bg-purple-500", // 🟣
  };

  // Filters: Active status toggles
  const [activeFilters, setActiveFilters] = useState(Object.keys(statusColors));

  // Toggle filter
  const toggleFilter = (status) => {
    setActiveFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Tooltip state
  const [tooltip, setTooltip] = useState({ show: false, content: "", x: 0, y: 0 });

  // Show tooltip on mouse over
  const handleMouseOver = (event, idagendacorsi, nomeCorso, learningCenter) => {
    setTooltip({
      show: true,
      content: `${idagendacorsi} - ${nomeCorso} - ${learningCenter}`,
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Hide tooltip on mouse out
  const handleMouseOut = () => {
    setTooltip({ show: false, content: "", x: 0, y: 0 });
  };

  return (
    <div className={styles.tableContainer}>
      {/* 🔹 Filters Section */}
      <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold w-full">Filter Events:</h3>
        {Object.keys(statusColors).map((status) => (
          <button
            key={status}
            onClick={() => toggleFilter(status)}
            className={`px-3 py-1 rounded-lg text-white text-sm transition ${
              activeFilters.includes(status) ? `${statusColors[status]} opacity-100` : "bg-gray-400 opacity-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* 🔹 Calendar Table */}
      <table className={styles.calendarTable}>
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
            const weekDays = Array.from({ length: 7 }, () => []);

            // Group events by day
            week.forEach((day) => {
              weekDays[day.Day_WeekdayNumber - 1].push(day);
            });

            return (
              <tr key={weekIndex} className={styles.tableRow}>
                <td className={`${styles.tableCell} font-bold`} data-label="Week">
                  {week[0].Day_WeekNumber}
                </td>
                {weekDays.map((dayEvents, dayIndex) => {
                  const isToday = dayEvents.length > 0 && isSameDate(dayEvents[0].Day_Date, today);
                  const cellClass =
                    dayIndex === 0 || dayIndex === 6
                      ? `${styles.tableCellRed} ${isToday ? styles.today : ""}`
                      : `${styles.tableCell} ${isToday ? styles.today : ""}`;

                  return (
                    <td
                      key={dayIndex}
                      className={cellClass}
                      onClick={() => dayEvents.length > 0 && onCellClick(dayEvents)}
                      style={{ cursor: "pointer" }}
                      data-label={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex]}
                    >
                      {dayEvents.length > 0 ? (
                        <div className="flex flex-col items-center">
                          <strong className="mb-1 text-lg">{dayEvents[0].Day_DayNumber}</strong>

                          {/* Show multiple colored circles for multiple courses */}
                          <div className="flex flex-wrap justify-center gap-1 mt-1">
                          {dayEvents
                              .filter((event) => activeFilters.includes(event.StatoAgenda))
                              .map((event, idx) => (
                                <span
                                  key={idx}
                                  className={`w-4 h-4 rounded-full cursor-pointer ${statusColors[event.StatoAgenda] || "bg-gray-400"}`}
                                  onMouseOver={(e) => handleMouseOver(e, event.IdAgendaCorsi, event.NomeCorso, event.LearningCenter)}
                                  onMouseOut={handleMouseOut}
                                />
                              ))}
                          </div>
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

      {/* 🔹 Tooltip for Circles */}
      {tooltip.show && (
        <div
          className="fixed bg-black text-white text-xs p-2 rounded-lg shadow-lg transition-opacity duration-300"
          style={{ top: tooltip.y + 10, left: tooltip.x + 10, zIndex: 50 }}
        >
          {tooltip.content}
        </div>
      )}

      {/* 🔹 Legend for Event Colors */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold">Agenda Status Colors:</h3>
        <ul className="mt-2 text-sm grid grid-cols-2 gap-2">
          {Object.entries(statusColors).map(([status, color]) => (
            <li key={status} className="flex items-center">
              <span className={`w-3 h-3 rounded-full ${color} inline-block mr-2`}></span> {status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarTable;
