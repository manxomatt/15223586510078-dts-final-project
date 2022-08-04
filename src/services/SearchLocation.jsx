import axios from 'axios';

const { CancelToken } = axios;

const api_token = 'e941318f9fmsh98f1e37732610e4p13fc36jsndbba69375b04';
const api_host = 'https://booking-com.p.rapidapi.com/v1';
const api_endpoint = '/hotels/locations?locale=id&name=';

export const SearchLocation = (input) => {
  if (input && input.length > 4) {
    try {
      const source = CancelToken.source();
      const request = axios.get(api_host + api_endpoint + input, {
        cancelToken: source.token,
        headers: {
          'X-RapidAPI-Key': api_token,
        },
      });

      return {
        async process(callback) {
          request.then((response) => {
            const json = response.data;

            if (json) {
              callback(
                json.map((address) => {
                  return {
                    city: address.city_name,
                    code: address.dest_id,
                    // country: address.country,
                    label: address.label,
                  };
                })
              );
            }
          });
        },
      };
    } catch (e) {
      console.error(e);
    }
  }

  return {
    process() {
      return [];
    },
    cancel() {},
  };
};
