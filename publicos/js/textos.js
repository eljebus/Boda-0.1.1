

class Textos {
    constructor(containerId) {
        $(document).ready(() => {
            this.init();
            // Limpiar el formulario al cargar
            this.limpiarFormulario();
        });
    }

    init() {
        $("#formulario").hide(); 
        $("#pencil-icon").on("click",this.showForm.bind(this));
        $("#compartirTexto").on("click",this.saveText.bind(this)); // Bind the context of 'this' to the method
    }

    showForm() {
        $("#formulario").toggle();
        $('html, body').animate({
            scrollTop: 0
        }, 500); // 500ms for smooth scrolling to the top
    }

    // Lista de palabras prohibidas
    palabrasProhibidas = [
        // Palabras base
        'puta', 'mierda', 'joder', 'coño', 'polla', 'gilipollas',
        'cabron', 'cabrón', 'hostia', 'puto', 'imbecil', 'imbécil',
        'idiota', 'pendejo', 'pendeja', 'chinga', 'verga', 'carajo',
        'maldito', 'maldita', 'estupido', 'estúpido', 'estupida', 'estúpida',
        'bastardo', 'bastarda', 'zorra', 'perra', 'marica', 'maricon', 'maricón',
        'cojones', 'huevon', 'huevón', 'huevona', 'pinche', 'culero', 'culera',
        'pendejo', 'pendeja', 'cabron', 'cabrona', 'cabrón', 'puto', 'puta',
        'mamon', 'mamón', 'mamona', 'chingada', 'chingado', 'jodido', 'jodida',
        'malparido', 'malparida', 'gonorrea', 'hijueputa', 'hijoputa', 'hdp',
        'mierda', 'caca', 'culo', 'tonto', 'tonta', 'idiota', 'tarado', 'tarada',
        
        // Variantes con separadores
        'p.uta', 'p_uta', 'p uta', 'pu.ta', 'pu_ta', 'pu ta', 'p.u.t.a', 'p_u_t_a',
        'pen.dejo', 'pen_dejo', 'pen dejo', 'pe.ndejo', 'pe_ndejo', 'pe ndejo', 'p.e.n.d.e.j.o',
        'ca.bron', 'ca_bron', 'ca bron', 'c.abron', 'c_abron', 'c abron', 'c.a.b.r.o.n',
        'hi.jueputa', 'hi_jueputa', 'hi jueputa', 'h.ijueputa', 'h_ijueputa', 'h ijueputa',
        'jo.der', 'jo_der', 'jo der', 'j.oder', 'j_oder', 'j oder', 'j.o.d.e.r',
        'chi.nga', 'chi_nga', 'chi nga', 'ch.inga', 'ch_inga', 'ch inga', 'c.h.i.n.g.a',
        'ma.mon', 'ma_mon', 'ma mon', 'm.amon', 'm_amon', 'm amon', 'm.a.m.o.n',
        'cu.lero', 'cu_lero', 'cu lero', 'c.ulero', 'c_ulero', 'c ulero', 'c.u.l.e.r.o',
        'ma.rica', 'ma_rica', 'ma rica', 'm.arica', 'm_arica', 'm arica', 'm.a.r.i.c.a',
        'zo.rra', 'zo_rra', 'zo rra', 'z.orra', 'z_orra', 'z orra', 'z.o.r.r.a',
        
        // Variantes con números y símbolos
        'p3ndejo', 'p3nd3j0', 'p3nd3jo', 'pend3j0', 'p€nd€j0', 'p£nd£j0',
        'pu74', 'put4', 'p3rra', 'p3rr4', 'pu7@', 'pu+@', 'pu+4',
        'c4bron', 'c4br0n', 'cabr0n', 'c4brón', 'c@br0n', 'c@br@n',
        'm13rd4', 'm1erd4', 'm1erda', 'm13rda', 'm!3rd@', 'm!erd@',
        'h1jueputa', 'h1ju3put4', 'h1ju3puta', 'h!ju3put@', 'h1ju€put@',
        'j0der', 'j0d3r', 'jod3r', 'j0d3r', 'j0d€r', 'j0d@r',
        
        // Variantes con repetición de letras
        'putaaa', 'putaaaa', 'putooo', 'putooooo',
        'pendejoooo', 'pendejooo', 'pendejaaaaa',
        'cabrooon', 'cabroooon', 'cabronnn',
        'mierdaaa', 'mierdaaaa', 'mierdaaaaa',
        
        // Variantes con mezcla de mayúsculas y minúsculas
        'PuTa', 'pUtA', 'PeNdEjO', 'PeNdEjA',
        'CaBrOn', 'cAbRoN', 'MiErDa', 'mIeRdA',
        'HiJuEpUtA', 'JoDeR', 'ChInGa', 'MaMoN',
        
        // Variantes invertidas
        'atup', 'adreim', 'redoj', 'oñoc',
        'ojednep', 'norbac', 'aitsoh', 'atidlam',
        
        // Variantes con caracteres especiales
        'p*ta', 'p#ta', 'p@ta', 'p&ta',
        'pend*jo', 'pend#jo', 'pend@jo', 'pend&jo',
        'c*bron', 'c#bron', 'c@bron', 'c&bron',
        'm*erda', 'm#erda', 'm@erda', 'm&erda'
    ];

    // Verifica si el texto contiene palabras prohibidas
    contieneGroserias(texto) {
        const textoLower = texto.toLowerCase();
        return this.palabrasProhibidas.some(palabra => textoLower.includes(palabra));
    }

    // Método para limpiar el formulario
    limpiarFormulario() {
        $("#nombre").val('');
        $("#deseo").val('');
    }

    saveText(){
        $("#compartirTexto").prop("disabled", true);
        $("#compartirTexto").html("Guardando...");
        const nombre = $("#nombre").val();
        const deseo = $("#deseo").val();

        // Verificar contenido inapropiado
        if (this.contieneGroserias(nombre) || this.contieneGroserias(deseo)) {
            alert("Por favor, evita usar lenguaje inapropiado.");
            $("#compartirTexto").prop("disabled", false);
            $("#compartirTexto").html("Guardar");
            return;
        }

        const url = "/guardar-texto"; // URL del controlador para guardar el texto

        $.ajax({
            type: "POST",
            url: url,
            data: { nombre: nombre, deseo: deseo },
            success: function(response) {
                console.log("Texto guardado exitosamente:", response);
                // Limpiar el formulario
                $("#nombre").val('');
                $("#deseo").val('');
                location.reload(); // Recargar la página después de guardar el texto
            },
            error: function(xhr, status, error) {
                console.error("Error al guardar el texto:", error);
                $("#compartirTexto").prop("disabled", false);
                $("#compartirTexto").html("Guardar");
                alert("Hubo un error al guardar el texto. Por favor, intenta nuevamente.");
            }
        });
    }
}

const miTextos = new Textos();
