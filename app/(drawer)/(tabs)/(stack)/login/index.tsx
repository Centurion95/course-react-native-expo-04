import CustomButton from '@/components/shared/CustomButton';
import { getPersonaAction } from '@/core/actions/infraestructura/infraestructura.actions';
import { loginAction } from '@/core/actions/login/login.actions';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const LoginScreen = () => {
  const [token, setToken] = useState<string | null>(null);
  const [persona, setPersona] = useState<any | null>(null);
  const [espacios, setEspacios] = useState<any | null>(null);
  const [ofertas, setOfertas] = useState<any | null>(null);

  const [visibleFiscalizacion, setVisibleFiscalizacion] = useState<number | null>(null);

  const toggleFiscalizacion = (id: number) => {
    setVisibleFiscalizacion(visibleFiscalizacion === id ? null : id);
  };

  const [loading, setLoading] = useState(true);

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
        const { token } = await loginAction('4331001', 'qwerty123456');
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
          <table className='table-auto border-collapse border'>
            {/* <thead>
                <tr>
                  <th>Campo</th>
                  <th>Valor</th>
                </tr>
              </thead> */}
            <tbody className='[&>tr>*]:border [&>tr>*]:px-4 [&>tr>*]:py-2'>
              <tr>
                <td>Persona ID</td>
                <td>{persona.id}</td>
              </tr>
              <tr>
                <td>Documento</td>
                <td>{persona.documento_persona}</td>
              </tr>
              <tr>
                <td>Nombre</td>
                <td>{persona.nombre_persona.trim()}</td>
              </tr>
              <tr>
                <td>Apellido</td>
                <td>{persona.apellido_persona.trim()}</td>
              </tr>
              <tr>
                <td>Fecha de nacimiento</td>
                <td>{persona.fecha_nacimiento}</td>
              </tr>
              <tr>
                <td>Usuario ID</td>
                <td>{persona.usuario_id}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{persona.email}</td>
              </tr>
              <tr>
                <td>Perfil ID</td>
                <td>{persona.perfil_id}</td>
              </tr>
              <tr>
                <td>Rol ID</td>
                <td>{persona.rol_id}</td>
              </tr>
            </tbody>
          </table>
        </View>
      )}

      {espacios && (
        <View style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Espacios</Text>
          <table className='table-auto border-collapse'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Espacio</th>
              </tr>
            </thead>
            <tbody className='[&>tr>*]:border [&>tr>*]:px-4 [&>tr>*]:py-2'>
              {espacios.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.espacio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </View>
      )}



      {ofertas && (
        <View style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Ofertas Educativas</Text>
          <table className="mb-10 table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Departamento</th>
                <th className="border px-4 py-2">Distrito</th>
                <th className="border px-4 py-2">Localidad/Barrio</th>
                <th className="border px-4 py-2">Código Establecimiento</th>
                <th className="border px-4 py-2">Nombre Establecimiento</th>
                <th className="border px-4 py-2">Direccion</th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {ofertas.map((item: any) => (
                <React.Fragment key={item.id}>
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.departamento}</td>
                    <td className="border px-4 py-2">{item.distrito}</td>
                    <td className="border px-4 py-2">{item.localidad}</td>
                    <td className="border px-4 py-2">{item.codigo_establecimiento}</td>
                    <td className="border px-4 py-2">{item.nombre_establecimiento}</td>
                    <td className="border px-4 py-2">{item.direccion}</td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2">
                        <Ionicons
                          name="eye-outline"
                          onClick={() => toggleFiscalizacion(item.id)}
                          style={{ cursor: "pointer" }} />
                        <Ionicons name="create-outline" />
                        <Ionicons name="download-outline" />
                      </div>
                    </td>
                  </tr>

                  {visibleFiscalizacion === item.id && item.fiscalizacion && (
                    <tr>
                      <td colSpan={10}>
                        <View style={{ padding: 16, backgroundColor: "orange", borderRadius: 8, margin: 10 }}>

                          <View style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 8, margin: 10 }}>

                            <Text style={{ fontWeight: "bold" }}>Fiscalizaciones</Text>

                            {/* <Text>ID:</Text>
                            <TextInput
                              value={item.fiscalizacion.id}
                              editable={false}
                              style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4, marginBottom: 8 }}
                            />

                            <Text>Fecha: </Text>
                            <TextInput
                              value={item.fiscalizacion.fecha_fiscalizacion}
                              editable={false}
                              style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4, marginBottom: 8 }}
                            /> */}

                            <Text>Latitud:</Text>
                            <TextInput
                              value={item.fiscalizacion.latitud}
                              editable={false}
                              style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4, marginBottom: 8 }}
                            />
                            <TextInput
                              value={item.fiscalizacion.lat}
                              editable={false}
                              style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4, marginBottom: 8 }}
                            />

                            <Text>Longitud:</Text>
                            <TextInput
                              value={item.fiscalizacion.longitud}
                              editable={false}
                              style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4, marginBottom: 8 }}
                            />
                            <TextInput
                              value={item.fiscalizacion.long}
                              editable={false}
                              style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4, marginBottom: 8 }}
                            />

                            <Text>Coordenada X:</Text>
                            <TextInput
                              value={item.fiscalizacion.coordenadas_x}
                              editable={false}
                              style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4, marginBottom: 8 }}
                            />

                            <Text>Coordenada Y:</Text>
                            <TextInput
                              value={item.fiscalizacion.coordenadas_y}
                              editable={false}
                              style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4, marginBottom: 8 }}
                            />

                          </View>
                        </View>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </View>
      )
      }

    </ScrollView >

  )
}

export default LoginScreen