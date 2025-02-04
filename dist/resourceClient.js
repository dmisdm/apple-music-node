"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceClient = void 0;
const axios_1 = __importDefault(require("axios"));
const appleMusicError_1 = require("./appleMusicError");
const calendarDate_1 = require("./calendarDate");
class ResourceClient {
    constructor(urlName, configuration) {
        this.urlName = urlName;
        this.configuration = configuration;
        this.axiosInstance = axios_1.default.create({
            baseURL: 'https://api.music.apple.com/v1',
            headers: {
                Authorization: `Bearer ${this.configuration.developerToken}`
            },
            // https://github.com/axios/axios/blob/v0.20.0-0/lib/defaults.js#L57-L65
            transformResponse: [
                data => {
                    /*eslint no-param-reassign:0*/
                    if (typeof data === 'string') {
                        try {
                            data = parseJSONWithDateHandling(data);
                        }
                        catch (e) {
                            /* Ignore */
                        }
                    }
                    return data;
                }
            ],
            validateStatus: () => true // Handle errors by ourselves
        });
    }
    get(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const storefront = (options === null || options === void 0 ? void 0 : options.storefront) || this.configuration.defaultStorefront;
            if (!storefront) {
                throw new Error(`Specify storefront with function parameter or default one with Client's constructor`);
            }
            const url = `/catalog/${storefront}/${this.urlName}/${id}`;
            let params = {
                l: (options === null || options === void 0 ? void 0 : options.languageTag) || this.configuration.defaultLanguageTag
            };
            const httpResponse = yield this.request('GET', url, params);
            if (!httpResponse.data) {
                throw new appleMusicError_1.AppleMusicError(`Request failed with status code ${httpResponse.status}`, httpResponse.status);
            }
            const apiResponse = httpResponse.data;
            // https://developer.apple.com/documentation/applemusicapi/handling_requests_and_responses#3001632
            if (!apiResponse.errors) {
                return apiResponse;
            }
            else {
                const error = apiResponse.errors[0];
                throw new appleMusicError_1.AppleMusicError(error.title, httpResponse.status, apiResponse);
            }
        });
    }
    request(method, apiPath, params) {
        return this.axiosInstance.request({
            method: method,
            url: apiPath,
            params: params
        });
    }
}
exports.ResourceClient = ResourceClient;
const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
function parseJSONWithDateHandling(json) {
    return JSON.parse(json, (_key, value) => {
        if (typeof value !== 'string') {
            return value;
        }
        const calendarDate = calendarDate_1.CalendarDate.parse(value);
        if (calendarDate) {
            return calendarDate;
        }
        if (value.match(datePattern)) {
            return new Date(value);
        }
        return value;
    });
}
//# sourceMappingURL=resourceClient.js.map