module.exports =  class Listing {

    constructor(url, address, price, bed, bath, area, deposit, type, contact_name, contact_email, contact_number,
                distance_to_campus, pets, smoking, parking, lease_period, description) {

        this._url = url;
        this._address = address;
        this._price = price;
        this._bed = bed;
        this._bath = bath;
        this._area = area;
        this._type = type;
        this._deposit = deposit;
        this._contact_name = contact_name;
        this._contact_email = contact_email;
        this._contact_number = contact_number;
        this._distance_to_campus = distance_to_campus;
        this._pets = pets;
        this._smoking = smoking;
        this._parking = parking;
        this._lease_period = lease_period;
        this._description = description;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get bed() {
        return this._bed;
    }

    set bed(value) {
        this._bed = value;
    }

    get bath() {
        return this._bath;
    }

    set bath(value) {
        this._bath = value;
    }

    get area() {
        return this._area;
    }

    set area(value) {
        this._area = value;
    }

    get deposit() {
        return this._deposit;
    }

    set deposit(value) {
        this._deposit = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get contact_name() {
        return this._contact_name;
    }

    set contact_name(value) {
        this._contact_name = value;
    }

    get contact_email() {
        return this._contact_email;
    }

    set contact_email(value) {
        this._contact_email = value;
    }

    get contact_number() {
        return this._contact_number;
    }

    set contact_number(value) {
        this._contact_number = value;
    }

    get distance_to_campus() {
        return this._distance_to_campus;
    }

    set distance_to_campus(value) {
        this._distance_to_campus = value;
    }

    get pets() {
        return this._pets;
    }

    set pets(value) {
        this._pets = value;
    }

    get smoking() {
        return this._smoking;
    }

    set smoking(value) {
        this._smoking = value;
    }

    get parking() {
        return this._parking;
    }

    set parking(value) {
        this._parking = value;
    }

    get lease_period() {
        return this._lease_period;
    }

    set lease_period(value) {
        this._lease_period = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }


};