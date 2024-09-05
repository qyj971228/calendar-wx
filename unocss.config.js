import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'
const include = [/\.wxml$/]

export default defineConfig({
	content: {
		pipeline: {
			include
		}
	},
	presets: [
		presetWeapp(),
	],
	rules: [
		[/^p-(\d+)$/, ([, d]) => ({ padding: `${d}rpx` })],
		[/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}rpx` })],
		[/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}rpx` })],
		[/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}rpx` })],
		[/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d}rpx` })],
		[/^m-(\d+)$/, ([, d]) => ({ margin: `${d}rpx` })],
		[/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}rpx` })],
		[/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}rpx` })],
		[/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}rpx` })],
		[/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}rpx` })],
		[/^mx-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}rpx`, 'margin-right': `${d}rpx` })],
		[/^my-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}rpx`, 'margin-bottom': `${d}rpx` })],
		[/^line-height-(\d+)$/, ([, d]) => ({ 'line-height': `${d}rpx` })],
	],
	separators: '__'
})