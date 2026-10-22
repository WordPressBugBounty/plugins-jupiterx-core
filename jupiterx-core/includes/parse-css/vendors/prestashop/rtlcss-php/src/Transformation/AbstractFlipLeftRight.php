<?php
namespace JupiterX_Core\PrestaShop\RtlCss\Transformation;

use JupiterX_Core\PrestaShop\RtlCss\Transformation\Value\TransformableStringValue;
use JupiterX_Core\Sabberworm\CSS\Rule\Rule;

/**
 * Transforms a value from 'left' to 'right'
 */
abstract class AbstractFlipLeftRight implements TransformationInterface
{
    /**
     * @inheritDoc
     */
    public function transform(Rule $rule)
    {
        $newValue = (new TransformableStringValue((string) $rule->getValue()))
            ->swapLeftRight()
            ->toString();

        $rule->setValue($newValue);

        return $rule;
    }
}
