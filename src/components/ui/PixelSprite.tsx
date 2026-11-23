const PALETTE: Record<string, string> = {
	a: 'var(--sprite-accent)',
	f: 'var(--foreground)',
	h: 'var(--highlight)',
	s: 'var(--sprite-secondary)',
	w: 'var(--surface)',
}

const SPRITES = {
	book: [
		'............',
		'.ffffffffff.',
		'.fsswwwwwwf.',
		'.fsswffffwf.',
		'.fsswwwwwwf.',
		'.fsswffffwf.',
		'.fsswwwwwwf.',
		'.fsswfffwwf.',
		'.fsswwwwwwf.',
		'.ffffffffff.',
		'.fwwwwwwwwf.',
		'..ffffffff..',
	],
	folder: [
		'............',
		'.ffff.......',
		'.fhhhf......',
		'.fhhhhfffff.',
		'.fhhhhhhhhf.',
		'.ffffffffff.',
		'.fhhhhhhhhf.',
		'.fhhhhhhhhf.',
		'.fhhhhhhhhf.',
		'.fhhhhhhhhf.',
		'.ffffffffff.',
		'............',
	],
	lost: [
		'.ffffffff...',
		'.fwwwwwwff..',
		'.fwwwwwwfwf.',
		'.fwawwawffff',
		'.fwwawwwwwwf',
		'.fwawwawwwwf',
		'.fwwwwwwwwwf',
		'.fwwffffwwwf',
		'.fwfwwwwfwwf',
		'.fwwwwwwwwwf',
		'.fwfwwfwwfwf',
		'.ff.ff.ff.ff',
	],
	moon: [
		'............',
		'....hhhh....',
		'..hhhhh.....',
		'..hhhh......',
		'.hhhhh......',
		'.hhhhh......',
		'.hhhhh......',
		'.hhhhhh...h.',
		'..hhhhhhhhh.',
		'..hhhhhhhh..',
		'....hhhh....',
		'............',
	],
	sparkle: [
		'.....h......',
		'.....h......',
		'....hhh.....',
		'..hhhhhhh...',
		'....hhh.....',
		'.....h...a..',
		'.....h...a..',
		'........aaa.',
		'..s......a..',
		'.sss.....a..',
		'..s.........',
		'............',
	],
	sun: [
		'.....aa.....',
		'.a...aa...a.',
		'..a......a..',
		'....hhhh....',
		'...hhhhhh...',
		'aa.hhhhhh.aa',
		'aa.hhhhhh.aa',
		'...hhhhhh...',
		'....hhhh....',
		'..a......a..',
		'.a...aa...a.',
		'.....aa.....',
	],
	tag: [
		'............',
		'.fffffff....',
		'.fhhhhhhf...',
		'.fhffhhhhf..',
		'.fhffhhhhhf.',
		'.fhhhhhhhhhf',
		'.fhhhhhhhhf.',
		'.fhhhhhhhf..',
		'.ffhhhhhf...',
		'...fhhhf....',
		'....fff.....',
		'............',
	],
	terminal: [
		'ffffffffffff',
		'fafhfsfwwwwf',
		'ffffffffffff',
		'ffffffffffff',
		'ffsfffffffff',
		'fffsffffffff',
		'ffffsfffffff',
		'fffsffffffff',
		'ffsfffhhhfff',
		'ffffffffffff',
		'ffffffffffff',
		'............',
	],
	user: [
		'....ffff....',
		'...fhhhhf...',
		'..fhhhhhhf..',
		'..fhfhhfhf..',
		'..fhhhhhhf..',
		'..fhhffhhf..',
		'...fhhhhf...',
		'....ffff....',
		'..ffssssff..',
		'.fssssssssf.',
		'.fssssssssf.',
		'.ffffffffff.',
	],
} as const

export type PixelSpriteName = keyof typeof SPRITES

type PixelSpriteProps = {
	name: PixelSpriteName
	size?: number
	className?: string
}

export function PixelSprite({ name, size = 24, className = '' }: PixelSpriteProps) {
	const rows: readonly string[] = SPRITES[name]

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 12 12"
			width={size}
			height={size}
			className={`pixel-sprite ${className}`}
			aria-hidden="true"
			focusable="false"
		>
			{rows.flatMap((row, y) =>
				[...row].flatMap((cell, x) => {
					const fill = PALETTE[cell]
					const position = `${x}-${y}`
					return fill ? [<rect key={position} x={x} y={y} width="1" height="1" fill={fill} />] : []
				}),
			)}
		</svg>
	)
}
