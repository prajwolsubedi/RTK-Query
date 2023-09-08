import * as React from "react";
import { Calendar as Cal, momentLocalizer, Navigate } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import { Avatar, Box, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useGetAllMyLeavesQuery, useGetHolidaysQuery } from "../../../services/leave";
// import { Holiday, LeaveMinimal } from "../../../interfaces/Leave";
// import NepaliCalendar, { bsMonths } from "../../../utilities/NepaliCalendar";
// import { t } from "../../../utilities/translator";
// import { useGetCurrentOfficeTimingQuery } from "../../../services/attendance";
// import { OfficeTimingI } from "../../../interfaces/Attendance";
// import { blue } from "@mui/material/colors";

// const isHoliday = (
//     holidays: Array<Holiday>,
//     date: Date | moment.Moment,
//     defaultHolidays: Array<number> = [] // holiday days (weekend holidays)
// ) =>
//     (defaultHolidays.includes(moment(date)
//         .weekday()) && {title: "Weekend"}) ||
//     holidays.find(({ fromDate }) => moment(fromDate)
//         .isSame(moment(date), "day"));

// const isLeave = (
//     leaves: Array<LeaveMinimal>,
//     date: Date | moment.Moment,
// ) =>
//     leaves.find(({ leave_from, leave_to }) =>
//         !(moment(leave_from).isBefore(moment(date), "day")
//         || moment(leave_to).isAfter(moment(date), "day")));

// const holidayDayKeysFromOfficeTiming = (
//     o: OfficeTimingI | null | undefined
// ) => {
//     if (!o) return [];
//     const ret: Array<number> = [];
//     o.days.forEach((day, i) => {
//         if (day.weekend) {
//             ret.push(i);
//         }
//     });
//     return ret;
// };

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({
                                    children,
                                    value
                                }: {
    children: JSX.Element & { style: Record<string, string> };
    value: moment.Moment;
}) => {
    // can be called because requests are cached
    const { data: holidays = [] } = useGetHolidaysQuery();
    const { data: leaves = [] } = useGetAllMyLeavesQuery();

    // const { data: officeTiming } = useGetCurrentOfficeTimingQuery();
    // const isToday = moment()
    //     .isSame(moment(value), "day");
    // const defaultHolidays = holidayDayKeysFromOfficeTiming(officeTiming);
    // const isDateHoliday = ()=> isHoliday(holidays, value, defaultHolidays);
    // const isLeaveDate = () =>isLeave(leaves, value);

    // const getBgColor = () => {
    //     const isLeaveToday = isLeaveDate();
    //     if(isLeaveToday) return { color: "#3876D7" , name: isLeaveToday.name};
    //     const isHolidayToday = isDateHoliday();
    //     if (isHolidayToday) return { color: "#E6535D" , name: isHolidayToday.title};
    //     if (isToday) return { color: "#77C66E", name: ""};
    //     return undefined;
    // };
//     return React.cloneElement(
//         React.Children.only(children),
//         {
//             style: {
//                 ...children.style,
//                 backgroundColor: getBgColor()?.color,
//                 color: getBgColor() ? "white" : undefined,
//                 boxSizing: "border-box",
//                 // border: isToday && isHoliday && "2px solid darkred",
//                 display: "flex"
//             }
//         },
//         React.createElement(
//             "div",
//             {
//                 style: {
//                     textAlign: "center",
//                     width: "100%"
//                 }
//             },

//             <Tooltip title={getBgColor() ? getBgColor().name:""} arrow placement={"top"}>
//             <div
//                 style={{
//                     fontFamily: "Georgia",
//                     fontWeight: 600,
//                     fontSize: "14px",
//                     marginLeft: -4,
//                     marginTop: "8px",
//                 }}
//             >
//                 <br/>
//                 {NepaliCalendar.toDevanagariDigits(
//                     NepaliCalendar.convertADtoBS(moment(value)).bsDate
//                 )}
//             </div>
//             </Tooltip>
//         )
//     );
// };

// function CustomToolbar(props: { date: Date; onNavigate: (v: string) => void }) {
//     const {
//         date,
//         onNavigate
//     } = props;
//     const today = () => onNavigate(Navigate.TODAY);
//     const next = () => onNavigate(Navigate.NEXT);
//     const prev = () => onNavigate(Navigate.PREVIOUS);

//     const nepaliMonths = () =>
//         [
//             NepaliCalendar.convertADtoBS(moment(date)
//                 .startOf("M")).bsMonth,
//             NepaliCalendar.convertADtoBS(moment(date)
//                 .endOf("M")).bsMonth
//         ].map((mth) => bsMonths(t)[mth - 1]);

//     const nepaliYear = () =>
//         NepaliCalendar.toDevanagariDigits(
//             NepaliCalendar.convertADtoBS(moment(date)).bsYear
//         );

//     const englishYear = () =>
//         moment(date).year();

//     const englishMonth = () =>
//         moment(date).format("MMMM");

    return (
        <Box
            display="flex"
            py="2px"
            alignItems="center"
            justifyContent="space-between"

        >
            <Box display="flex">
                <IconButton onClick={() => prev()}>
                    <ChevronLeftIcon style={{ color: "#456C97" }}/>
                </IconButton>
                <IconButton onClick={() => today()}>
                    <StarIcon style={{ color: "#456C97" }}/>
                </IconButton>
                <IconButton onClick={() => next()}>
                    <ChevronRightIcon style={{ color: "#456C97" }}/>
                </IconButton>
            </Box>
            <Box display="flex" fontWeight={600}>
                <Box pr="8px">
                    {englishYear()}
                </Box>
                {englishMonth()}
            </Box>
            <Box display="flex" fontWeight={600}>
                <Box fontFamily="Georgia" pr="8px">
                    {nepaliYear()}
                </Box>
                {nepaliMonths()
                    .map((m, i) => (
                        <Box key={m as unknown as string} fontFamily="Georgia">
                            {i !== 0 && "/"}
                            {m as unknown as string}
                        </Box>
                    ))}
            </Box>
        </Box>
    );
}

function CustomHeader(props: { label: string }) {
    const { label } = props;
    const bigCalendarToHRISMapper = {
        Sun: "cal.days.s1",
        Mon: "cal.days.s2",
        Tue: "cal.days.s3",
        Wed: "cal.days.s4",
        Thu: "cal.days.s5",
        Fri: "cal.days.s6",
        Sat: "cal.days.s7"
    };

    return (
        <div style={{
            fontFamily: "Georgia",
            fontSize: "10px",
            color: "#456C97"
        }}>
            {t(
                bigCalendarToHRISMapper[
                    label as keyof typeof bigCalendarToHRISMapper
                    ] as string,
                "np"
            )}
        </div>
    );
}

function Calendar() {

    const { data: holidays = [] } = useGetHolidaysQuery();
    const { data: leaves = [] } = useGetAllMyLeavesQuery();

    const { data: officeTiming } = useGetCurrentOfficeTimingQuery();

    const isToday = (date: Date) => moment()
        .isSame(moment(date), "day");
    const defaultHolidays = holidayDayKeysFromOfficeTiming(officeTiming);
    const isDateHoliday = (date: Date) => isHoliday(holidays, date, defaultHolidays);
    const isLeaveDate = (date: Date) => isLeave(leaves, date);

    const getBgColor = (date: Date) => {
        const isLeaveToday = isLeaveDate(date);
        if(isLeaveToday) return { color: "#3876D7" , name: isLeaveToday.name};
        const isHolidayToday = isDateHoliday(date);
        if (isHolidayToday) return { color: "#E6535D" , name: isHolidayToday.title};
        const isDateToday = isToday(date);
        if (isDateToday) return { color: "#77C66E", name: ""};
        return undefined;
    };

    return (
        <Paper elevation={6} sx={{
            p: "0px 4px 4px 4px",
            color: '#456C97'
        }}>
            <Cal
                style={{
                    height: "340px",
                    width: "100%",
                    marginTop: "16px"
                }}
                defaultView="month"
                views={["month"]}
                localizer={mLocalizer}
                components={{
                    month: {
                        dateHeader: ({
                                         date,
                                         label
                                     }) => (
                                         <Tooltip title={getBgColor(date) ? getBgColor(date).name:""} arrow placement={"top"}>
                                            <Typography
                                                sx={{
                                                    color: getBgColor(date) ? "white": '#456C97',
                                                    fontSize: 10
                                                }}
                                                textAlign="center"
                                            >
                                                {label}
                                            </Typography>
                                         </Tooltip>
                        ),
                        header: CustomHeader
                    },
                    dateCellWrapper: ColoredDateCellWrapper as React.ComponentType<any>,
                    toolbar: CustomToolbar as React.ComponentType<any>
                }}
            />
            <Grid container alignItems={"center"} style={{ padding: 10 }}>
                <Grid container alignItems={"center"} spacing={1} item xs={4}>
                    <Grid item>
                        <Avatar
                            sx={{
                                bgcolor: '#77C66E',
                                height: 20,
                                width: 20
                            }}
                            alt="Remy Sharp"
                        >
                            &nbsp;
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography>Today</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems={"center"} spacing={1} item xs={4}>
                    <Grid item>
                    <Avatar
                        sx={{
                            bgcolor: '#f06262',
                            height: 20,
                            width: 20
                        }}
                        alt="Remy Sharp"
                    >
                        &nbsp;
                    </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography>Holiday</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems={"center"} spacing={1} item xs={4}>
                    <Grid item>
                    <Avatar
                        sx={{
                            bgcolor: '#3876D7',
                            height: 20,
                            width: 20
                        }}
                        alt="Remy Sharp"
                    >
                        &nbsp;
                    </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography>Leave</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default React.memo(Calendar);
