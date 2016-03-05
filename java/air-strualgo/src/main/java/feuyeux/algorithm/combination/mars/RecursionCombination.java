package feuyeux.algorithm.combination.mars;

import java.util.ArrayList;

public class RecursionCombination implements Combination {
    private int targetLength;
    private int sourceLength;
    private int targetArray[];
    private int sourceArray[];
    private final ArrayList<int[]> target = new ArrayList<int[]>();

    @Override
    public ArrayList<int[]> get(final int[] source) {
        sourceArray = source;
        sourceLength = source.length;
        for (targetLength = sourceLength; targetLength > 0; targetLength--) {
            targetArray = new int[targetLength];
            recursion(0, 0);
        }
        return target;
    }

    private void recursion(final int sourceIndex, final int targetIndex) {
        if (targetIndex == targetLength) {
            target.add(targetArray.clone());
        } else if (sourceLength - sourceIndex == targetLength - targetIndex) {
            for (int i = 0; i < targetLength - targetIndex; i++) {
                targetArray[targetIndex + i] = sourceArray[sourceIndex + i];
            }

            target.add(targetArray.clone());
        } else {
            targetArray[targetIndex] = sourceArray[sourceIndex];
            recursion(sourceIndex + 1, targetIndex + 1);//add
            recursion(sourceIndex + 1, targetIndex);//output
        }
    }
}
