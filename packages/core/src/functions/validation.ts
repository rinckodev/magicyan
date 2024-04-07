export function isEmail(email: string){
    return new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email);
}
export function isUrl(url: string){
  	return new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/).test(url);
}

export function isNumeric(text: string): boolean {
  	return new RegExp(/^\d+$/).test(text);
}