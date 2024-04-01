'use client'
import React, { useEffect } from "react";
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import { Dayjs } from "dayjs";
import { useAppDispatch } from "@/redux/store";
import { getScheduledPosts } from "@/redux/actions/contentCalendarAction";

const ContentCalendar = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getScheduledPosts());
  }, []);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <Calendar style={{ margin: '2rem', background: 'none' }} onPanelChange={onPanelChange} />
  );
};

export default ContentCalendar;
