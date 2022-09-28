import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

class Result {

    /*
     * Complete the 'cookies' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts following parameters:
     *  1. INTEGER k
     *  2. INTEGER_ARRAY A
     */

    public static int cookies(int k, List<Integer> A) {
        // Write your code here
        int count = 0;
        Queue<Integer> pq = new PriorityQueue<>();
        for (Integer value: A) {
            pq.add(value);
        }

        if(pq.size() == 0 || pq.size() == 1)
            return -1;

        while (pq.size() > 1 && pq.peek() <= k) {
            count++;
            int temp = pq.poll() + 2*pq.poll();
            pq.add(temp);
        }

        if(pq.size() < 2 &&  pq.peek() < k)
            return -1;

        return count;
    }
}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));


        String[] firstMultipleInput = bufferedReader.readLine().replaceAll("\\s+$", "").split(" ");

        int n = Integer.parseInt(firstMultipleInput[0]);

        int k = Integer.parseInt(firstMultipleInput[1]);

        String[] ATemp = bufferedReader.readLine().replaceAll("\\s+$", "").split(" ");

        List<Integer> A = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            int AItem = Integer.parseInt(ATemp[i]);
            A.add(AItem);
        }

        int result = Result.cookies(k, A);
        System.out.println(result);

        bufferedReader.close();
    }
}
