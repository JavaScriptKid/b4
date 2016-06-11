export default function(indexOfSelected=0, previousIndex=null, pageSize=0, dataset=[]) {

    // console.log('index', indexOfSelected)
    // console.log('pageSize', pageSize)

    if (dataset.length <= pageSize) {
        return dataset;
    }




    // if (indexOfSelected <= 2) {
    //     return dataset.slice(0, pageSize);
    // }
    //


    /* if in the last page, just show the last page */
    if (indexOfSelected > dataset.length - pageSize) {
        return dataset.filter((d, i) => {
            return i >= dataset.length - pageSize
        });
    }
    

    return dataset.slice(indexOfSelected, indexOfSelected + pageSize);
}