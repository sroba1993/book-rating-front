export interface IBook {
    id: number,
	title: string,
	author: string,
    starts: number
}

export interface IBookData {
    id: number,
	title: string,
	author: string
}

export interface IBookRating {
    id: number,
	bookId: number,
	stars: number
}