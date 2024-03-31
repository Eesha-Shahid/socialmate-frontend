'use client'
import React from "react";
import { AuthLayout } from "@/components";
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import { Dayjs } from "dayjs";

const ContentCalendar = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <AuthLayout>
      <Calendar style={{ margin: '2rem', background: 'none' }} onPanelChange={onPanelChange} />
    </AuthLayout>
  );
};

export default ContentCalendar;
