
  export function objectFromJSON(url: string): any {
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(`Failed because: ${error}`));
  };

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// From neuroglancer/util/json.ts
function swapQuotes(x: string) {
    return x.replace(/['"]/g, s => {
        return (s === '"' ? '\'' : '"');
    });
}

function urlSafeStringifyString(x: string) {
    return swapQuotes(JSON.stringify(swapQuotes(x)));
}

const URL_SAFE_COMMA = '_';

export function urlSafeStringify(x: any): string {
    if (typeof x === 'object') {
        if (x === null) {
            return 'null';
        }
        let toJSON = x['toJSON'];
        if (typeof toJSON === 'function') {
            return urlSafeStringify(toJSON.call(x));
        }
        if (Array.isArray(x)) {
            let s = '[';
            let size = x.length;
            let i = 0;
            if (i < size) {
                s += urlSafeStringify(x[i]);
                while (++i < size) {
                    s += URL_SAFE_COMMA;
                    s += urlSafeStringify(x[i]);
                }
            }
            s += ']';
            return s;
        }
        let s = '{';
        let keys = Object.keys(x);
        let first = true;
        for (let key of keys) {
            let value = x[key];
            if (value === undefined) {
                continue;
            }
            let valueString = urlSafeStringify(value);
            if (!valueString) {
                continue;
            }
            if (!first) {
                s += URL_SAFE_COMMA;
            } else {
                first = false;
            }
            s += urlSafeStringifyString(key);
            s += ':';
            s += valueString;
        }
        s += '}';
        return s;
    }
    if (typeof x === 'string') {
        return urlSafeStringifyString(x);
    }
    return JSON.stringify(x);
}

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// From neuroglancer/ui/url_hash_bindings.ts
export function encodeFragment(fragment: string) {
    return encodeURI(fragment).replace(/[!'()*;,]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}
