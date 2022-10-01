import { message } from 'antd';

class ApiService {
  fetch = (url, customOptions) => {
    const prefixedUrl = `${process.env.PUBLIC_URL}${url}`;
    const options = {
      method: 'get',
      data: undefined,
      useFormdata: false,
      failSilently: false,
      showErrorMessage: true,
      controller: new AbortController(),
      ...customOptions,
    };

    const request = {
      signal: options.controller.signal,
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    };
    if (options.data) {
      if (options.useFormdata) {
        const formData = new FormData();
        for (const key in options.data) {
          formData.append(key, options.data[key]);
        }
        request.body = formData;
      } else {
        request.body = JSON.stringify(options.data);
      }
    }
    // eslint-disable-next-line no-console
    return fetch(prefixedUrl, request).then((res) => {
      if (res.ok) {
        if (res.headers.get('content-type') === 'application/json') {
          return res.json();
        }
      } else {
        return res.json().catch(() => {
          if (options.showErrorMessage === true) {
            message.error(
              `${options.method.toUpperCase()} ${prefixedUrl} (${res.status}) ${
                res.statusText
              }`
            );
          }
          return Promise.reject({
            status: res.status,
            text: res.statusText,
          });
        });
      }
    });
  };

  getEvents = (filters) => {
    const params = new URLSearchParams();
    if (filters.types) params.set('type__in', filters.types);
    if (filters.startDate)
      params.set('start_date__gte', filters.startDate.toISOString());
    if (filters.endDate)
      params.set('end_date__lte', filters.endDate.toISOString());
    return this.fetch(`/api/events/?${params}`);
  };

  getTimelineDensity = () => {
    return this.fetch('/api/events/get_timeline_density/');
  }
}


export const api = new ApiService();
