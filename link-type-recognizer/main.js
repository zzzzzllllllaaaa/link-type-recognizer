"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var obsidian_1 = require("obsidian");
;
var LinkTypeRecognizerPlugin = /** @class */ (function (_super) {
    __extends(LinkTypeRecognizerPlugin, _super);
    function LinkTypeRecognizerPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinkTypeRecognizerPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.addRibbonIcon('link', '链接类型识别器', function (evt) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.openModal();
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    LinkTypeRecognizerPlugin.prototype.openModal = function () {
        var _this = this;
        var modal = new obsidian_1.Modal(this.app);
        modal.title = "链接类型识别器";
        var contentEl = modal.contentEl;
        // 创建输入框
        var textarea = contentEl.createEl('textarea', {
            placeholder: '输入链接，每行一个',
            rows: 5
        });
        // 创建生成按钮
        var generateButton = contentEl.createEl('button', { text: '生成代码' });
        generateButton.addEventListener('click', function () {
            var output = _this.generateHTML(textarea.value);
            outputEl.textContent = output;
        });
        // 创建输出区域
        var outputEl = contentEl.createEl('pre', { text: '' });
        // 创建复制按钮
        var copyButton = contentEl.createEl('button', { text: '复制代码' });
        copyButton.addEventListener('click', function () {
            _this.copyToClipboard(outputEl.textContent);
        });
        contentEl.appendChild(generateButton);
        contentEl.appendChild(outputEl);
        contentEl.appendChild(copyButton);
        modal.open();
    };
    LinkTypeRecognizerPlugin.prototype.generateHTML = function (input) {
        var urls = input.split('\n').map(function (url) { return url.trim(); }).filter(function (url) { return url; });
        var generatedHTML = '';
        var imageRegex = /\.(jpeg|jpg|png|gif|bmp|webp)(\?.*)?$/i;
        var audioRegex = /\.(mp3|wav|ogg|m4a)(\?.*)?$/i;
        var videoRegex = /\.(mp4|webm|ogg)(\?.*)?$/i;
        urls.forEach(function (url) {
            if (imageRegex.test(url)) {
                generatedHTML += "<img src=\"".concat(url, "\" alt=\"Image\" style=\"max-width: 100%; height: auto;\">\n");
            }
            else if (audioRegex.test(url)) {
                generatedHTML += "<audio controls><source src=\"".concat(url, "\" type=\"audio/mpeg\">\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u97F3\u9891\u6807\u7B7E\u3002</audio>\n");
            }
            else if (videoRegex.test(url)) {
                generatedHTML += "<video controls style=\"max-width: 100%; height: auto;\"><source src=\"".concat(url, "\" type=\"video/mp4\">\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u89C6\u9891\u6807\u7B7E\u3002</video>\n");
            }
            else {
                generatedHTML += "\u65E0\u6CD5\u8BC6\u522B\u94FE\u63A5\u7C7B\u578B\uFF1A".concat(url, "\uFF0C\u8BF7\u8F93\u5165\u6709\u6548\u7684\u56FE\u7247\u3001\u97F3\u9891\u6216\u89C6\u9891\u94FE\u63A5\u3002\n");
            }
        });
        return generatedHTML.trim();
    };
    LinkTypeRecognizerPlugin.prototype.copyToClipboard = function (text) {
        navigator.clipboard.writeText(text).then(function () {
            new obsidian_1.Notice('代码已复制到剪贴板！');
        }, function () {
            new obsidian_1.Notice('复制失败，请手动复制。');
        });
    };
    return LinkTypeRecognizerPlugin;
}(obsidian_1.Plugin));
exports.default = LinkTypeRecognizerPlugin;
