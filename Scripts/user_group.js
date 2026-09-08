import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';

export const options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '20s', target: 5 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },
};


export default function () {
    group('Open Home Page', () => {
        const response = http.get(BASE_URL);

        check(response, {
            'status is 200': (r) => r.status === 200,

        });
    });
    sleep(1);

    group('Open News Page', () => {
        const response = http.get(`${BASE_URL}/news.php`);

        check(response, {
            'news loaded': (r) => r.status === 200,

        });

    }),
        sleep(2);

    group('Open Blogs Page', () => {
        const response = http.get(`${BASE_URL}/blogs/`);

        check(response, {
            'blogs loaded': (r) => r.status === 200,

        });

    }),
        sleep(3);

}






/*
export default function () {
    const response = http.get(BASE_URL);

    check(response, {
        'status is 200': (r) => r.status === 200,

    });
    sleep(1);
}*/

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    }
}
