// function for rounding fractional numbers(value)(decimals-number of decimal places)
export const round=(value:number, decimals:number)=> {
    // @ts-ignore
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}