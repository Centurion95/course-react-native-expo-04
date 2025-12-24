import { StyleSheet, Text, View } from 'react-native';
const ScheduleScreen = () => {

  const data = [
    { label: "Persona ID", value: "3202114" },
    { label: "Documento", value: "4331001" },
    { label: "Nombre", value: "RODRIGO JOSE" },
    { label: "Apellido", value: "CENTURION AGUILERA" },
    { label: "Fecha de nacimiento", value: "1995-01-05" },
    { label: "Usuario ID", value: "1503789" },
    { label: "Email", value: "centu95@hotmail.com" },
    { label: "Perfil ID", value: "1825325" },
    { label: "Rol ID", value: "80" },
  ];

  return (
    <View style={styles.table}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>🧑 Datos de la Persona</Text>
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cellLabel}>{row.label}</Text>
          <Text style={styles.cellValue}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cellLabel: {
    flex: 1,
    fontWeight: "bold",
  },
  cellValue: {
    flex: 1,
    textAlign: "right",
  },
});

export default ScheduleScreen;