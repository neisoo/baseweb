/**
 * Base64 encoded IMG data for static backgrounds in TicketMachine
 * Replaces BG assets in artwork/ticketmachine/static
 * Resolves issue of TicketMachine.tmSwapBackgrounds method requesting images during animation,
 * and related visual glitches on slow connections
 */
define(['ticketmachine_imgdata'], function (tmBgImgData) {
	return {
		tm_abcmouse_preintro_static: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAAAGBAMAAAAmt/EiAAAAG1BMVEUAAAD/tSH/uCH/tiT/tiP/tyT/tiT+tST/tiV1ddCDAAAACHRSTlMAHi4+Xn6PvzHJwMEAAAAgSURBVHheY2BwL6cWKGMAgogOaoH2EWecsDG1gBEDAwBIFtAZK+ZpbAAAAABJRU5ErkJggg==',
		tm_abcmouse_static: 'data:image/png;base64,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',
		tm_ticket_slot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAASCAMAAABxcDC5AAAArlBMVEV5GQD++ev//+7++ez/++9MaXH/+uzVliRaEwCddkX/+uv/+e//+u20bzL/zi//+ev/++3/+ez/+uz//+7/+uvCgDGdSRGZSSXhpy7/0DSAIwTowmViHQyeZjH0wS3//OzmwmH/zza3j0r/+uz/zSv879720bT6viftmkr53sbwpU3uol/umj/vlyfzox/ukhv0qjDzwZnytnnuqHV/IAH8xSl/HwH2ryN/HAH4tyUGfHjdAAAAI3RSTlP93w6/PgDvxffvzy5u4NOPfq9eHp/J5cnN2fPj8+3FTvH98YzaruUAAADcSURBVHhetdVXVsNAEETRGUktQDJyDORUPcrBgbj/jdEj/OEF0HcD79RXGRLBLAxjKEjC+YJGvjOJochGp84U2JdlNyhoyyYHnsfOAq4uWE1/QJxKZwk0rKnYw0pnjsMHi+zp4t9l7PU5JmSAHYubu3cFm1sWDULpVOOc7aeKNYsOkE7O3reOaxbDWcfoOOu4HxaPlxoe7lm0sGQsahavb1cKXlgUR6zIzFDtWFULRGTI6oaK2skc6aQxXNl/KemOQBL4Di0ToMqVOGAanH4h0DyGJCLP0CjSktKfX/ps4ahTOQStAAAAAElFTkSuQmCC',
		tm_basket_static: 'data:image/png;base64,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',
		tm_baskettickets_static: 'data:image/png;base64,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',
	}
});