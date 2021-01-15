/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '0s', target: 150 }, // below normal load
    { duration: '30s', target: 150 },
    // { duration: '10s', target: 150 }, // normal load
    // { duration: '1m', target: 150 },
    // { duration: '10s', target: 200 }, // around the breaking point
    // { duration: '1m', target: 200 },
    // { duration: '10s', target: 250 }, // beyond the breaking point
    // { duration: '1m', target: 250 },
    // { duration: '30s', target: 0 }, // scale down. Recovery stage.
  ],
  thresholds: {
    errors: ['rate<0.03'], // <3% errors
  },
};

export default () => {
  const res = http.get(`http://ec2-18-222-132-216.us-east-2.compute.amazonaws.com/comments/${Math.floor(Math.random() * 100) + 1}`);
  const result = check(res, { 'is status 200': (r) => r.status === 200 });
  errorRate.add(!result);
};
