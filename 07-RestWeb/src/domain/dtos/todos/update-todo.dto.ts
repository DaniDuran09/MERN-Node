export class UpdateTodoDto {

    private constructor(

        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,

    ) { }

    //* DI
    get values() {
        const returnObj: { [key: string]: any } = {}

        if (this.text) returnObj.text = this.text;
        if (this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create(id: number, props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { text, completedAt } = props;
        let newCompletedAt = completedAt;

        if (!id || isNaN(Number(id))) {
            return ['id must be a valid number'];
        }

        if (completedAt) {
            newCompletedAt = new Date(completedAt)
            if (newCompletedAt.toString() === 'Invalid Date') {
                return ['CompletedAt must be a valid date']
            }
        }

        return [, new UpdateTodoDto(id, text, newCompletedAt)];
    }



}

