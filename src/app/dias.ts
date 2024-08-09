export class Dias {
    Lunes: boolean;
    Martes: boolean;
    Miercoles: boolean;
    Jueves: boolean;
    Viernes: boolean;
    Sabado: boolean;
    Domingo: boolean;

    constructor(
        Lunes: boolean = false, 
        Martes: boolean = false,
        Miercoles: boolean = false,
        Jueves: boolean = false,
        Viernes: boolean = false,
        Sabado: boolean = false,
        Domingo: boolean = false
    ) {
        this.Lunes = Lunes;
        this.Martes = Martes;
        this.Miercoles = Miercoles;
        this.Jueves = Jueves;
        this.Viernes = Viernes;
        this.Sabado = Sabado;
        this.Domingo = Domingo;
    }

    setTrue(dia: 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo' | 'Pendiente'): void {
        (this as any)[dia] = true;
    }

    setFalse(dia: 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo' | 'idea'): void {
        (this as any)[dia] = false;
    }
}
