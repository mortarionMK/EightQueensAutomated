let row = [1,2,3,4,5,6,7,8];
let column = 'abcdefgh'.split('');
let position = row.forEach(number => {
    column.forEach(element => {
        position += element + number
    });
});