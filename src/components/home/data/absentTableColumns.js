export const absentTableColumns = [

    {
        name: 'Member name',
        selector: row => row.memberName,
    },
    {
        name: 'Type of absence',
        selector: row => row.absentType,
    },
    {
        name: 'Period',
        selector: row => row.period,
    },
    {
        name: 'Member Note',
        selector: row => row.absentStatus,
        style: { 'whiteSpace': 'unset' }
    },
    {
        name: 'Status',
        selector: row => row.admitterNote,
        style: { 'whiteSpace': 'unset' }
    },
    {
        name: 'Admitter note',
        selector: row => row.memberNote,
    },
    {
        name: 'Schedule on Calender',
        selector: row => row.calender,
    }
];



