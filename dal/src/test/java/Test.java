import org.springframework.beans.factory.annotation.Autowired;

import java.sql.*;
import java.util.List;

public class Test {
    @Autowired

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        String URL="jdbc:mysql://127.0.0.1:3306/chessgame_db?useUnicode=true&characterEncoding=utf-8";
        String USER="root";
        String PASSWORD="root";
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn= DriverManager.getConnection(URL, USER, PASSWORD);

        Statement st=conn.createStatement();
        ResultSet rs=st.executeQuery("select * from cg_user");
        while(rs.next()){
            System.out.println(rs.getString("userid")+" " +rs.getString("password"));
        }

        //关闭资源
        rs.close();
        st.close();
        conn.close();
    }
}
