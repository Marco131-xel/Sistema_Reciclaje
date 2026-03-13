<?php

namespace App\Http\Controllers;

use App\Models\Entrega;
use Illuminate\Http\Request;

class EntregaController extends Controller
{

    // listar entregas
    public function index()
    {
        $entregas = Entrega::with('contenedor')->get();

        return response()->json($entregas);
    }


    // guardar entrega
    public function store(Request $request)
    {
        $request->validate([
            'cantidad' => 'required|numeric',
            'fecha_hora' => 'required|date',
            'codigo_ciudadano' => 'required|string|max:30',
            'id_contenedor' => 'required|exists:contenedor,id_contenedor'
        ]);

        $entrega = Entrega::create($request->all());

        return response()->json([
            'message' => 'Entrega registrada correctamente',
            'data' => $entrega
        ],201);
    }


    // mostrar una entrega
    public function show($id)
    {
        $entrega = Entrega::with('contenedor')->findOrFail($id);

        return response()->json($entrega);
    }


    // eliminar
    public function destroy($id)
    {
        $entrega = Entrega::findOrFail($id);
        $entrega->delete();

        return response()->json([
            'message' => 'Entrega eliminada'
        ]);
    }
}