function defaultSelectEquipment(){
    sumOrder -= priceEquipment;
    $('#total').text(sumOrder);
    priceEquipment = 0;
    selectEquipment.empty();
    selectEquipment.append('<option>Выберите комплектацию</option>');
}