<?php

namespace App\Http\Controllers;

use App\Models\Contenedor;
use App\Models\Entrega;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EntregaController extends Controller {

    // listar entregas
    public function index() {
        $entregas = Entrega::with('contenedor')->get();

        return response()->json($entregas);
    }


    // guardar entrega
    public function store(Request $request) {
        $request->validate([
            'cantidad' => 'required|numeric',
            'fecha_hora' => 'required|date',
            'codigo_ciudadano' => 'required|string|max:30',
            'id_contenedor' => 'required|exists:contenedor,id_contenedor'
        ]);

        DB::beginTransaction();

        try {
            //guardar entrega
            $entrega = Entrega::create($request->all());
            // obtener contenedor
            $contenedor = Contenedor::findOrFail($request->id_contenedor);
            // sumar todas las entregas
            $total = Entrega::where('id_contenedor', $contenedor->id_contenedor)->sum('cantidad');
            // calcular porcentaje
            $porcentaje = ($total / $contenedor->capacidad) * 100;
            // actualizar contenedor
            $contenedor->update(['porcentaje' => $porcentaje]);

            DB::commit();

            return response()->json(['message' => 'Entrega registrada','data' => $entrega],201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()],500);
        }

        $entrega = Entrega::create($request->all());

        return response()->json([
            'message' => 'Entrega registrada correctamente',
            'data' => $entrega
        ],201);
    }


    // mostrar una entrega
    public function show($id) {
        $entrega = Entrega::with('contenedor')->findOrFail($id);

        return response()->json($entrega);
    }


    // eliminar
    public function destroy($id) {
        $entrega = Entrega::findOrFail($id);
        $entrega->delete();

        return response()->json([
            'message' => 'Entrega eliminada'
        ]);
    }
}