import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions, IMyDateModel, IMyCalendarViewChanged, IMyMonth } from '../../src/my-date-picker/interfaces';
import { MyDatePicker } from '..';

declare var require: any;
const inlineSampleTpl: string = require('./sample-date-picker-inline.html');

@Component({
    selector: 'sample-date-picker-inline',
    template: inlineSampleTpl
})

export class SampleDatePickerInline implements OnInit {

    private myDatePickerInlineOptions: IMyDpOptions = {
        inline: true,
        disableUntil: { year: 0, month: 0, day: 0 },
        disableDays: [{ year: 0, month: 0, day: 0 }],
        showWeekNumbers: true,
        selectorHeight: '232px',
        selectorWidth: '252px',
        allowSelectionOnlyInCurrentMonth: false,
        showMonthHeader: true,
        fullMonthLabels: { 1: 'Januar', 2: 'Februar', 3: 'Marts', 4: 'April', 5: 'Maj', 6: 'Juni', 7: 'Juli', 8: 'August', 9: 'September', 10: 'Oktober', 11: 'November', 12: 'December' },
        showNextBtn: true,
        showPrevBtn: true
    };
    private selectedDateInline: Object = {};
    private selectedDateInline2: Object = {};

    private selectedTextInline: string = '';    
    private border: string = 'none';
    private locale: string = 'en';

    private selectorSizes: Array<string> = new Array('normal', 'small');
    private locales: Array<string> = new Array('en', 'fr', 'ja', 'fi', 'es', 'hu', 'sv', 'nl', 'ru', 'uk', 'no', 'tr', 'pt-br', 'de', 'it', 'it-ch', 'pl', 'my', 'sk', 'sl', 'zh-cn', 'he', 'ro', 'ca', 'id', 'en-au', 'am-et', 'cs', 'el', 'kk', 'th', 'ko-kr', 'da', 'lt', 'vi', 'bn', 'bg', 'hr', 'ar', 'is', 'de-ch', 'fr-ch');

    constructor() { }

    ngOnInit() {
        console.log('onInit(): SampleDatePickerInline');
    }

    onChangeLocale(locale: string) {
        this.locale = locale;
    }

    onSelectorSize(size: string) {
        let copy = this.getCopyOfOptions();
        if (size === 'normal') {
            copy.selectorHeight = '232px';
            copy.selectorWidth = '252px';
            this.myDatePickerInlineOptions = copy;
        }
        else {
            copy.selectorHeight = '200px';
            copy.selectorWidth = '220px';
            this.myDatePickerInlineOptions = copy;
        }
    }

    onDisablePast(checked: boolean) {
        let date = new Date();

        // Disable/enable dates from 5th backward
        date.setDate(date.getDate() - 5);

        let copy = this.getCopyOfOptions();
        copy.disableUntil = checked ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : { year: 0, month: 0, day: 0 };
        this.myDatePickerInlineOptions = copy;
    }

    onDisableFuture(checked: boolean) {
        let date = new Date();

        // Disable/enable dates from 5th forward
        date.setDate(date.getDate() + 5);

        let copy = this.getCopyOfOptions();
        copy.disableSince = checked ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : { year: 0, month: 0, day: 0 };
        this.myDatePickerInlineOptions = copy;
    }

    onDisableSingleDates(checked: boolean) {
        let date = new Date();

        // Disable/enable next month 1st and 3rd days
        let copy = this.getCopyOfOptions();
        copy.disableDays = checked ? [{ year: date.getFullYear(), month: date.getMonth() + 2, day: 1 }, { year: date.getFullYear(), month: date.getMonth() + 2, day: 3 }] : [];
        this.myDatePickerInlineOptions = copy;
    }

    onDisableToday(checked: boolean) {
        let date = new Date();

        // Disable/enable today
        let copy = this.getCopyOfOptions();
        copy.disableDays = checked ? [{ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }] : [];
        this.myDatePickerInlineOptions = copy;
    }

    onDisableRange(checked: boolean) {
        let bdate = new Date();
        let edate = new Date();

        // Disable/enable +-3 today
        let copy = this.getCopyOfOptions();

        bdate.setDate(bdate.getDate() - 3);
        edate.setDate(edate.getDate() + 3);

        copy.disableDateRanges = checked ? [{ begin: { year: bdate.getFullYear(), month: bdate.getMonth() + 1, day: bdate.getDate() }, end: { year: edate.getFullYear(), month: edate.getMonth() + 1, day: edate.getDate() } }] : [];
        this.myDatePickerInlineOptions = copy;
    }

    onDisableWeekends(checked: boolean) {
        // Disable/enable weekends
        let copy = this.getCopyOfOptions();
        copy.disableWeekends = checked;
        this.myDatePickerInlineOptions = copy;
    }

    onMarkCurrentDay(checked: boolean) {
        // Mark current day
        let copy = this.getCopyOfOptions();
        copy.markCurrentDay = checked;
        this.myDatePickerInlineOptions = copy;
    }

    selectedMonth1: string = '03-2018';
    selectedMonth2: string = '04-2018';
    isFirstActive: boolean = true;
    isSecondActive: boolean = true;

    onDateChanged(event: IMyDateModel) {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.formatted !== '') {
            this.selectedTextInline = 'Formatted: ' + event.formatted + ' - epoc timestamp: ' + event.epoc;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedTextInline = '';
            this.border = 'none';
        }

        this.isFirstActive = true;
        this.isSecondActive = false;
    }

    onDateChanged2(event: IMyDateModel) {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.formatted !== '') {
            this.selectedTextInline = 'Formatted: ' + event.formatted + ' - epoc timestamp: ' + event.epoc;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedTextInline = '';
            this.border = 'none';
        }
        this.isFirstActive = false;
        this.isSecondActive = true;
    }

    onCalendarViewChanged(event: IMyCalendarViewChanged) {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    }

    getCopyOfOptions(): IMyDpOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerInlineOptions));
    }

    @ViewChild('datepicker1') datepicker1: MyDatePicker;
    @ViewChild('datepicker2') datepicker2: MyDatePicker;

    onPrevMonthClicked(event: IMyMonth) {
        console.log('prev clicekd');
        // this.selectedDateInline = {};
        // this.selectedDateInline2 = {};
        // this.nextMonth(event.year, event.monthNbr);
        this.datepicker2.goToPrevMonth();
    }

    onNextMonthClicked(event: IMyMonth) {
        console.log('next clicekd');
        // this.selectedDateInline = {};
        // this.selectedDateInline2 = {};
        // this.prevMonth(event.year, event.monthNbr);
        this.datepicker1.goToNextMonth();
    }

    private prevMonth(y: number, m: number) {
        let m_string: string;
        if (m == 1) {
            y -= 1;
            m = 12;
        }
        else {
            m -= 1;
        }
        if (m < 10) {
            m_string = '0' + m;
        }
        else {
            m_string = m.toString();
        }
        this.selectedMonth1 = `${m_string}-${y}`;
    }

    private nextMonth(y: number, m: number) {
        let m_string: string;
        if (m == 12) {
            y += 1;
            m = 1;
        }
        else {
            m += 1;
        }
        if (m < 10) {
            m_string = '0' + m;
        }
        else {
            m_string = m.toString();
        }
        this.selectedMonth2 = `${m_string}-${y}`;
    }

}
