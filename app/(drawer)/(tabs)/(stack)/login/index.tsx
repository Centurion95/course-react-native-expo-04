import CustomButton from '@/components/shared/CustomButton';
import { getPersonaAction } from '@/core/actions/infraestructura/infraestructura.actions';
import { loginAction } from '@/core/actions/login/login.actions';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import MapView from 'react-native-maps';
import MapView from '@/components/shared/MapView';
import { RadioButton } from 'react-native-paper';

const LoginScreen = () => {
  const [token, setToken] = useState<string | null>(null);
  const [persona, setPersona] = useState<any | null>(null);
  const [espacios, setEspacios] = useState<any | null>(null);
  const [ofertas, setOfertas] = useState<any[]>([]);

  const [visibleFiscalizacion, setVisibleFiscalizacion] = useState<number | null>(null);

  const toggleFiscalizacion = (id: number) => {
    setVisibleFiscalizacion(visibleFiscalizacion === id ? null : id);
  };

  const [loading, setLoading] = useState(true);

  // Estados de filtros 
  const [departamentoFilter, setDepartamentoFilter] = useState("");
  const [distritoFilter, setDistritoFilter] = useState("");
  const [localidadFilter, setLocalidadFilter] = useState("");
  const [codigoFilter, setCodigoFilter] = useState("");
  const [nombreFilter, setNombreFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // 🔑 cantidad de filas por página 

  // 1️⃣ Filtrar primero
  const filteredOfertas = ofertas?.filter((item) => {
    return (
      item.departamento.toLowerCase().includes(departamentoFilter.toLowerCase()) &&
      item.distrito.toLowerCase().includes(distritoFilter.toLowerCase()) &&
      item.localidad.toLowerCase().includes(localidadFilter.toLowerCase()) &&
      item.codigo_establecimiento.toString().includes(codigoFilter) &&
      item.nombre_establecimiento.toLowerCase().includes(nombreFilter.toLowerCase())
    );
  });


  // 2️⃣ Paginación sobre el resultado filtrado 
  const totalPages = Math.ceil(filteredOfertas.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredOfertas.slice(startIndex, endIndex);

  useEffect(() => {
    async function saveToken() {
      if (token) {
        if (Platform.OS === "web") {
          localStorage.setItem("token", token);
        }
        else {
          await SecureStore.setItemAsync("token", token);
        }
      } else {
        if (Platform.OS === "web") {
          localStorage.removeItem("token");
        }
        else {
          await SecureStore.deleteItemAsync("token");
        }
      }
    }
    saveToken();
  }, [token]);


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { token } = await loginAction('4331001', 'Mec2025!');
        setToken(token);
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return (
      <View className='justify-center items-center flex-1'>
        <ActivityIndicator color="blue" size={40} />
      </View>
    )
  }

  if (!token) {
    return (
      <View className='justify-center items-center flex-1'>
        <Text style={{ fontSize: 18 }}>❌ No se pudo iniciar sesión</Text>
      </View>
    )
  }

  const consultarPersonaAction = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getPersonaAction('4331001');
      setPersona(data.persona);
      setEspacios(data.espacios);
      // setOfertas(data.ofertas);
      setOfertas(data.ofertas_con_fiscalizacion);
      console.log('data:', data);
    } catch (error) {
      console.error('Error fetching persona:', error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <ScrollView className="px-5 mt-2">

      {token && <Text style={{ fontSize: 18 }}>✅ Inicio de sesión correcto</Text>}

      <CustomButton
        className="mb-2"
        color="primary"
        onPress={() => consultarPersonaAction()}
      >
        Consultar Persona
      </CustomButton>

      {persona && (
        <View style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>🧑 Datos de la Persona</Text>

          <View style={styles.card}>
            <View style={styles.row_card}>
              <Text style={styles.label}>Persona ID</Text>
              <Text style={styles.value}>{persona.id}</Text>
            </View>
            <View style={styles.row_card}>
              <Text style={styles.label}>Documento</Text>
              <Text style={styles.value}>{persona.documento_persona}</Text>
            </View>
            <View style={styles.row_card}>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.value}>{persona.nombre_persona.trim()}</Text>
            </View>
            <View style={styles.row_card}>
              <Text style={styles.label}>Apellido</Text>
              <Text style={styles.value}>{persona.apellido_persona.trim()}</Text>
            </View>
            <View style={styles.row_card}>
              <Text style={styles.label}>Fecha de nacimiento</Text>
              <Text style={styles.value}>{persona.fecha_nacimiento}</Text>
            </View>
            <View style={styles.row_card}>
              <Text style={styles.label}>Usuario ID</Text>
              <Text style={styles.value}>{persona.usuario_id}</Text>
            </View>
            <View style={styles.row_card}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{persona.email}</Text>
            </View>
            <View style={styles.row_card}>
              <Text style={styles.label}>Perfil ID</Text>
              <Text style={styles.value}>{persona.perfil_id}</Text>
            </View>
            <View style={styles.row_card}>
              <Text style={styles.label}>Rol ID</Text>
              <Text style={styles.value}>{persona.rol_id}</Text>
            </View>
          </View>
        </View>
      )}

      {espacios && (
        <View style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Espacios</Text>

          <View style={styles.table}>
            {/* Encabezado */}
            <View style={[styles.row, styles.header]}>
              <Text style={[styles.cell, styles.headerText]}>ID</Text>
              <Text style={[styles.cell, styles.headerText]}>Espacio</Text>
            </View>

            {/* Filas dinámicas */}
            {espacios.map((item: any) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.cell}>{item.id}</Text>
                <Text style={styles.cell}>{item.espacio}</Text>
              </View>
            ))}
          </View>
        </View>
      )}



      {ofertas.length > 0 && (
        <View style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Relevamiento de Infraestructura</Text>

          <View style={styles.table}>
            {/* Encabezado */}
            <View style={[styles.row, styles.header]}>
              <Text style={[styles.cell, styles.headerText]}>
                Departamento
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputFilter}
                    value={departamentoFilter}
                    onChangeText={setDepartamentoFilter}
                  />
                  {departamentoFilter.length > 0 && (
                    <TouchableOpacity onPress={() => setDepartamentoFilter("")}>
                      <Ionicons name="close-circle" size={20} color="#888" />
                    </TouchableOpacity>
                  )}
                </View>
              </Text>
              <Text style={[styles.cell, styles.headerText]}>
                Distrito
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputFilter}
                    value={distritoFilter}
                    onChangeText={setDistritoFilter}
                  />
                  {distritoFilter.length > 0 && (
                    <TouchableOpacity onPress={() => setDistritoFilter("")}>
                      <Ionicons name="close-circle" size={20} color="#888" />
                    </TouchableOpacity>
                  )}
                </View>
              </Text>
              <Text style={[styles.cell, styles.headerText]}>
                Localidad/Barrio
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputFilter}
                    value={localidadFilter}
                    onChangeText={setLocalidadFilter}
                  />
                  {localidadFilter.length > 0 && (
                    <TouchableOpacity onPress={() => setLocalidadFilter("")}>
                      <Ionicons name="close-circle" size={20} color="#888" />
                    </TouchableOpacity>
                  )}
                </View>
              </Text>
              <Text style={[styles.cell, styles.headerText]}>
                Código Establecimiento
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputFilter}
                    value={codigoFilter}
                    onChangeText={setCodigoFilter}
                  />
                  {codigoFilter.length > 0 && (
                    <TouchableOpacity onPress={() => setCodigoFilter("")}>
                      <Ionicons name="close-circle" size={20} color="#888" />
                    </TouchableOpacity>
                  )}
                </View>
              </Text>
              <Text style={[styles.cell, styles.headerText]}>
                Nombre Establecimiento
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputFilter}
                    value={nombreFilter}
                    onChangeText={setNombreFilter}
                  />
                  {nombreFilter.length > 0 && (
                    <TouchableOpacity onPress={() => setNombreFilter("")}>
                      <Ionicons name="close-circle" size={20} color="#888" />
                    </TouchableOpacity>
                  )}
                </View>
              </Text>
              <Text style={[styles.cell, styles.headerText]}>Dirección</Text>
              <Text style={[styles.cell, styles.headerText]}></Text>
            </View>

            {/* Renderizar filas de la página actual */}
            {currentData?.map((item: any) => (
              <View key={item.id}>
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.departamento}</Text>
                  <Text style={styles.cell}>{item.distrito}</Text>
                  <Text style={styles.cell}>{item.localidad}</Text>
                  <Text style={styles.cell}>{item.codigo_establecimiento}</Text>
                  <Text style={styles.cell}>{item.nombre_establecimiento}</Text>
                  <Text style={styles.cell}>{item.direccion}</Text>
                  <View style={styles.cell}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                      <TouchableOpacity onPress={() => toggleFiscalizacion(item.id)}>
                        <Ionicons name="eye-outline" size={20} />
                      </TouchableOpacity>
                      <Ionicons name="create-outline" size={20} />
                      <Ionicons name="download-outline" size={20} />
                    </View>
                  </View>
                </View>

                {visibleFiscalizacion === item.id && item.fiscalizacion && (
                  <View style={{ padding: 12, backgroundColor: "orange" }}>
                    <View style={styles.cell} className='bg-gray-300 rounded-md p-2 pb-4'>
                      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>Fiscalizaciones</Text>
                      <View style={styles.hr} />

                      <View style={styles.cell} className='bg-white rounded-md p-2 pb-4 ml-8'>
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>General</Text>
                        <Text style={{ fontSize: 18, marginBottom: 4, textAlign: 'center' }}>Planilla de Infraestructura</Text>
                        <View style={styles.hr} />


                        <Text style={styles.text_title}>1 - Localizacion geografica e identificacion del local escolar</Text>
                        <View className='bg-white rounded-md p-2 pb-4 ml-8'>
                          <Text style={styles.text_sub_title}>1.1 - Coordenadas de localización</Text>
                          <MapView />

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Latitud</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.fiscalizacion?.latitud ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.fiscalizacion?.lat ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Longitud</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.fiscalizacion?.longitud ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.fiscalizacion?.long ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Coordenada X</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.fiscalizacion?.coordenadas_x ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Coordenada Y</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.fiscalizacion?.coordenadas_y ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>
                        </View>


                        <Text style={styles.text_title}>2 - Identificación del local escolar y Acceso</Text>
                        <View className='bg-white rounded-md p-2 pb-4 ml-8'>
                          <Text style={styles.text_sub_title}>2.1 - Identificación del local escolar y Acceso</Text>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Codigo Local</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.codigo_establecimiento ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Departamento</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.departamento ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Distrito</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.distrito ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Localidad</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.localidad ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Dirección</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.direccion ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Instituciones</Text>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <Text>Nombre Institución</Text>
                            </View>
                            <View style={styles.cell}>
                              <TextInput
                                value={item.nombre_institucion ?? '-'}
                                editable={false}
                                style={styles.input} />
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>

                          <Text style={styles.text_sub_title}>2.2 - El local escolar cuenta con rampas de acceso para estudiantes de discapacidad</Text>
                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <RadioButton.Group onValueChange={value => console.log(value)} value={"si"}>
                                <RadioButton.Item label="Si" value="si" />
                                <RadioButton.Item label="No" value="no" />
                              </RadioButton.Group>
                            </View>
                            <View style={styles.cell}>
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>
                        </View>


                        <Text style={styles.text_title}>3 - Instalación eléctrica General</Text>
                        <View className='bg-white rounded-md p-2 pb-4 ml-8'>
                          <Text style={styles.text_sub_title}>3.1 - Acometida</Text>
                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <RadioButton.Group onValueChange={value => console.log(value)} value={"bueno"}>
                                <RadioButton.Item label="Bueno" value="bueno" />
                                <RadioButton.Item label="Regular" value="regular" />
                                <RadioButton.Item label="Malo" value="malo" />
                              </RadioButton.Group>
                            </View>
                            <View style={styles.cell}>
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>

                          <Text style={styles.text_sub_title}>3.2 - Entrada principal y tablero</Text>
                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <RadioButton.Group onValueChange={value => console.log(value)} value={"bueno"}>
                                <RadioButton.Item label="Bueno" value="bueno" />
                                <RadioButton.Item label="Regular" value="regular" />
                                <RadioButton.Item label="Malo" value="malo" />
                              </RadioButton.Group>
                            </View>
                            <View style={styles.cell}>
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>

                          <Text style={styles.text_sub_title}>3.3 - Tablero Seccional</Text>
                          <View style={styles.row}>
                            <View style={styles.cell}>
                              <RadioButton.Group onValueChange={value => console.log(value)} value={"bueno"}>
                                <RadioButton.Item label="Bueno" value="bueno" />
                                <RadioButton.Item label="Regular" value="regular" />
                                <RadioButton.Item label="Malo" value="malo" />
                              </RadioButton.Group>
                            </View>
                            <View style={styles.cell}>
                            </View>
                            <View style={styles.cell}>
                            </View>
                          </View>
                        </View>


                      </View>
                    </View>
                  </View>
                )}
              </View>
            ))}

            {/* Controles de paginación */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <Button title="Anterior" onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
              <Text>
                Página {currentPage} de {totalPages}
              </Text>
              <Button title="Siguiente" onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </View>

          </View>

        </View>
      )
      }

    </ScrollView >

  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    margin: 16,
    elevation: 2, // para sombra en Android
    shadowColor: "#000", // para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row_card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  label: {
    fontWeight: "600",
    color: "#333",
  },
  value: {
    color: "#555",
    textAlign: "right",
  },

  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
    margin: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  header: {
    backgroundColor: "lightblue",
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderColor: "#eee",
  },
  headerText: {
    fontWeight: "bold",
    color: "#333",
  },
  inputFilter: {
    // borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,

    // flex: 1,
    // paddingVertical: 4,
    // paddingHorizontal: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,

    // flex: 1,
    // paddingVertical: 4,
    // paddingHorizontal: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    // paddingHorizontal: 8,
    marginTop: 4,
    backgroundColor: "#fff",
  },
  hr: {
    borderBottomColor: "#ccc", // color de la línea
    borderBottomWidth: StyleSheet.hairlineWidth, // grosor mínimo
    marginVertical: 8, // espacio arriba y abajo
  },
  text_title: {
    fontWeight: "bold",
    marginVertical: 8,
    color: "green",
  },
  text_sub_title: {
    marginVertical: 8,
  },
});




export default LoginScreen